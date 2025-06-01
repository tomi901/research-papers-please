<script lang="ts">
  import PaperUpload from './PaperUpload.svelte';
  import PaperList from './PaperList.svelte';
  import ReviewModal from './ReviewModal.svelte';

  import {
    getUserStore,
    getTokensStore,
    getPapersStore,
  } from '$lib/papers-service.svelte';

  import type {
    PaperInfo,
  } from '$lib/model/paper-info';
  
  const papers = getPapersStore();
  const user = getUserStore();
  const wallet = getTokensStore();
  let showUpload = $state(false);
  let selectedPaper: PaperInfo | null = $state(null);
  
  function handleOpenReviewModal(paper: PaperInfo) {
    // console.log("Selected paper", paper);
    selectedPaper = paper;
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-gray-900">Re Search</h1>
          <span class="text-sm text-gray-500">Scientific Paper Review Platform</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-700">Logged in as:</span> 
            <span class="text-sm font-medium hover:bg-blue-700">{user.name}</span>
            <span class="text-sm font-medium text-gray-700">-</span>
            <span class="text-sm font-medium text-gray-700">Tokens:</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">{wallet.tokens}</span>
          </div>
          <button 
            onclick={() => showUpload = true}
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer"
          >
            Upload Paper
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <PaperList 
      papers={papers.papers}
      currentUser={user}
      onReview={handleOpenReviewModal}
    />
  </main>

  <!-- Upload Modal -->
  {#if showUpload}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Upload Scientific Paper</h2>
            <button 
              onclick={() => showUpload = false}
              class="text-gray-400 hover:text-gray-600"
              aria-label="Close Upload Modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <PaperUpload onClose={() => showUpload = false} />
        </div>
      </div>
    </div>
  {/if}

  <!-- Review Modal -->
  {#if selectedPaper}
    <ReviewModal
      paper={selectedPaper}
      currencyTokens={wallet.tokens}
      onClose={() => selectedPaper = null}
    />
  {/if}
</div>
