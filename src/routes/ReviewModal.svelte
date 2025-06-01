<script lang="ts">
  import { REQUIRED_REVIEW_TOKENS, submitReview } from '$lib/papers-service.svelte';
  import type {
    PaperInfo,
  } from '$lib/model/paper-info';

  interface Props {
    paper: PaperInfo;
    currencyTokens: number;
    onClose: () => void;
  }

  let { paper, currencyTokens, onClose }: Props = $props();
  
  let summary = $state('');
  let isSubmitting = $state(false);
  let isApproving = $state(false);
  
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    if (!summary.trim()) {
      alert('Please provide a comment');
      return;
    }
    
    isSubmitting = true;
    
    // Simulate review submission delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    submitReview({
      paperId: paper.id,
      summary: summary.trim(),
      approved: isApproving,
    });
    
    isSubmitting = false;
    onClose();
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Review Paper</h2>
          <p class="text-sm text-gray-600 mt-1">{paper.title}</p>
        </div>
        <button 
          onclick={onClose}
          class="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Paper Info -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 class="font-medium text-gray-900 mb-2">{paper.title}</h3>
        <p class="text-sm text-gray-600 mb-2">by {paper.author.name}</p>
        <p class="text-sm text-gray-700">{paper.abstract}</p>
      </div>

      <!-- Review Form -->
      <form onsubmit={handleSubmit} class="space-y-6">

        <!-- Comment -->
        <div>
          <label for="comment" class="block text-sm font-medium text-gray-700 mb-2">
            Review Comment *
          </label>
          <textarea
            id="comment"
            bind:value={summary}
            required
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Provide your detailed review of the paper..."
          ></textarea>
        </div>

        <!-- Token Deposit -->
        <div>
          <p class="text-m mt-1">
            <strong>{REQUIRED_REVIEW_TOKENS}</strong> tokens will be deposited as a warranty for the review.
            They will be returned if the DAO votes it as a legitimate review.
          </p>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onclick={onClose}
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onclick={() => isApproving = true}
            disabled={isSubmitting || currencyTokens < REQUIRED_REVIEW_TOKENS}
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Approve
          </button>
          <button
            type="submit"
            onclick={() => isApproving = false}
            disabled={isSubmitting || currencyTokens < REQUIRED_REVIEW_TOKENS}
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reject
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
