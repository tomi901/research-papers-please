<script lang="ts">
  import { addPaper } from '$lib/papers-service.svelte';

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();
  
  let title = $state('');
  let additionalAuthors = $state('');
  let abstract = $state('');
  let file: File | null = $state(null);
  let isSubmitting = $state(false);
  
  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    
    if (!title || !abstract || !file) {
      alert('Please fill in all required fields');
      return;
    }
    
    isSubmitting = true;
    
    // Simulate file upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    addPaper({
      title,
      abstract,
    });
    
    isSubmitting = false;
    onClose();
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
      Paper Title *
    </label>
    <input
      type="text"
      id="title"
      bind:value={title}
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter the title of your paper"
    />
  </div>

  <!-- div>
    <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
      Additional authors
    </label>
    <input
      type="text"
      id="author"
      bind:value={additionalAuthors}
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter author name(s)"
    />
  </div -->

  <div>
    <label for="abstract" class="block text-sm font-medium text-gray-700 mb-2">
      Abstract *
    </label>
    <textarea
      id="abstract"
      bind:value={abstract}
      required
      rows="6"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter the abstract of your paper"
    ></textarea>
  </div>

  <div>
    <label for="file" class="block text-sm font-medium text-gray-700 mb-2">
      Paper File (PDF) *
    </label>
    <input
      id="file"
      bind:value={file}
      required
      accept=".pdf"
      type="file"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
    <p class="text-sm text-gray-500 mt-1">Upload your paper in PDF format</p>
  </div>

  <div class="flex justify-end space-x-3">
    <button
      type="button"
      onclick={onClose}
      class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isSubmitting ? 'Uploading...' : 'Upload Paper'}
    </button>
  </div>
</form>
