<script lang="ts">
  import { fromStore } from "svelte/store";
  import {
    getUserStore,
  } from '$lib/papers-service.svelte';

  import type {
    PaperInfo,
  } from '$lib/model/paper-info';

  interface Props {
    paper: PaperInfo;
    onReview: (paper: PaperInfo) => void;
  }

  let { paper, onReview }: Props = $props();
  const currentUser = getUserStore();
  
  const approvals = $derived(paper.reviews.filter(r => r.approved).length);
  
  const canReview = $derived(
    paper.author.id !== currentUser.id && 
    !paper.reviews.some(r => r.reviewer.id === currentUser.id) &&
    paper.status === 'under_review'
  );
  
  const hasUserReviewed = $derived(
    paper.reviews.some(r => r.reviewer.id === currentUser.id)
  );
  
  function handleReview() {
    onReview(paper);
  }
</script>

<div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
  <!-- Status Badge -->
  <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
    <div class="flex justify-between items-center">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {paper.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        {paper.status === 'published' ? '✓ Published' : '🔍 Under Review'}
      </span>
      <span class="text-xs text-gray-500">
        {paper.uploadDate.toLocaleDateString()}
      </span>
    </div>
  </div>

  <div class="p-4">
    <!-- Title and Author -->
    <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
      {paper.title}
    </h3>
    <p class="text-sm text-gray-600 mb-3">by {paper.author.name}</p>

    <!-- Abstract -->
    <p class="text-sm text-gray-700 mb-4 line-clamp-3">
      {paper.abstract}
    </p>

    <!-- Stats -->
    <div class="flex justify-between items-center mb-4 text-sm">
      <div class="flex space-x-4">
        <span class="text-gray-600">
          Reviews: <span class="font-medium">{paper.reviews.length}</span>
        </span>
        <span class="text-gray-600">
          Approvals: <span class="font-medium text-green-600">{approvals}/5</span>
        </span>
      </div>
    </div>

    <!-- Progress Bar for Approvals -->
    {#if paper.status === 'under_review'}
      <div class="mb-4">
        <div class="flex justify-between text-xs text-gray-600 mb-1">
          <span>Approval Progress</span>
          <span>{approvals}/5</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-green-500 h-2 rounded-full transition-all duration-300"
            style="width: {Math.min((approvals / 5) * 100, 100)}%"
          ></div>
        </div>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex space-x-2">
      {#if canReview}
        <button
          onclick={handleReview}
          class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Review Paper
        </button>
      {:else if hasUserReviewed}
        <button
          disabled
          class="flex-1 bg-gray-300 text-gray-500 px-3 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
        >
          Already Reviewed
        </button>
      {:else if paper.author.id === currentUser.id}
        <span>Uploaded by you</span>
      {:else}
        <button
          class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Get Access (1 Token)
        </button>
      {/if}
    </div>

    <!-- Reviews Summary -->
    
    <div class="mt-4 pt-4 border-t border-gray-200">
      {#if paper.reviews.length > 0}
        <h4 class="text-sm font-medium text-gray-900 mb-2">Reviews</h4>
        <div class="space-y-2">
          {#each paper.reviews as review}
            <div class="text-xs bg-gray-50 p-2 rounded">
              <p class="text-gray-700">{review.summary}</p>
            </div>
          {/each}
        </div>
      {:else}
        <h4 class="text-sm font-medium text-gray-900 mb-2">No reviews</h4>
      {/if}
    </div>
  </div>
</div>
