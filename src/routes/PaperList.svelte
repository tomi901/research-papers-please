<script lang="ts">
  import PaperCard from './PaperCard.svelte';
  import type {
    PaperInfo,
    UserInfo,
  } from '$lib/model/paper-info';

  interface Props {
    papers: PaperInfo[];
    currentUser: UserInfo,
    onReview: (paper: PaperInfo) => void;
  }

  interface Filter {
    id: string;
    displayName: string;
    predicate: (paper: PaperInfo) => boolean;
  }
  
  let { papers, currentUser, onReview }: Props = $props();
  
  const filters = [
    {
      id: 'all',
      displayName: 'All Papers',
      predicate: () => true,
    },
    {
      id: 'underReview',
      displayName: 'Under Review',
      predicate: (paper) => paper.status === 'under_review',
    },
    {
      id: 'published',
      displayName: 'Published',
      predicate: (paper) => paper.status === 'published',
    },
    {
      id: 'byUser',
      displayName: 'Uploaded by user',
      predicate: (paper) => paper.author.id === currentUser.id,
    },
  ] as const satisfies ReadonlyArray<Filter>;

  let currentFilter = $state<Filter>(filters[0]);

  const filteredPapers = $derived.by(() => {
    return papers.filter(currentFilter.predicate);
  });

  function getFilterCount(filter: Filter) {
    return papers.filter(filter.predicate).length;
  }
</script>

<div class="space-y-6">
  <!-- Filter Tabs -->
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8">
      {#each filters as filter (filter.id)}
        <button
          onclick={() => currentFilter = filter}
          class="py-2 px-1 border-b-2 font-medium text-sm {currentFilter.id === filter.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
        >
          {filter.displayName} ({getFilterCount(filter)})
        </button>
      {/each}
    </nav>
  </div>

  <!-- Papers Grid -->
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {#each filteredPapers as paper (paper.id)}
      <PaperCard 
        {paper}
        {onReview}
      />
    {/each}
  </div>

  {#if filteredPapers.length === 0}
    <div class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
      <p class="text-gray-500">
        {currentFilter.id === 'all' ? 'No papers have been uploaded yet.' : `None found in this category.`}
      </p>
    </div>
  {/if}
</div>
