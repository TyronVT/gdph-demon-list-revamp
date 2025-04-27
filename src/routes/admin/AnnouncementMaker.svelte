<script>
    import "./styles.scss";

    import { Color } from '@tiptap/extension-color'
    import ListItem from '@tiptap/extension-list-item'
    import TextStyle from '@tiptap/extension-text-style'
    import StarterKit from "@tiptap/starter-kit";
    import { Editor } from "@tiptap/core";
    import Text from '@tiptap/extension-text';
    import ColorPicker from 'svelte-awesome-color-picker';
    import { onMount } from "svelte";

    // Icons
    import { Bold } from 'lucide-svelte';
    import { Italic } from 'lucide-svelte';
    import { Strikethrough } from 'lucide-svelte';
    import { RemoveFormatting } from 'lucide-svelte';
    import { Heading1 } from 'lucide-svelte';
    import { Heading2 } from 'lucide-svelte';
    import { Heading3 } from 'lucide-svelte';
    import { Heading4 } from 'lucide-svelte';
    import { Heading5 } from 'lucide-svelte';
    import { Heading6 } from 'lucide-svelte';
    import { List } from 'lucide-svelte';
    import { ListOrdered } from 'lucide-svelte';
    import { SeparatorHorizontal } from 'lucide-svelte';
    import { Undo2 } from 'lucide-svelte';
    import { Redo2 } from 'lucide-svelte';
    import Button from "$lib/components/ui/button/button.svelte";
    import { PaintBucket } from 'lucide-svelte';
    
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import { enhance } from '$app/forms';

    let element = $state();
    let editor = $state();
    let editorHTML = $state();

    onMount(() => {
      editor = new Editor({
        element: element,
        extensions: [
          Color.configure({ types: [TextStyle.name, ListItem.name] }),
          TextStyle.configure({ types: [ListItem.name] }),
          StarterKit,
          Text
        ],
        content: `Enter Announcement here...`,
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor;
          editorHTML = editor.getHTML();
        },
      });
    });

  let hex = $state("#f6f0dc")

  let rgb = $state({
    "r": 246,
    "g": 240,
    "b": 220,
    "a": 1
  })

  let hsv = $state({
    "h": 46,
    "s": 11,
    "v": 96,
    "a": 1
  })

  let color = $state("// instance of Colord")

  /** @type {{data: any, form: any}} */
  let { data, form } = $props();
  </script>

<style>
  button {
    border: 1px solid white;
    padding: 3px;
    transition: all 0.2s ease-in-out;
    border-radius: 6px;
  }

  button:hover {
    background-color: #434343;
  }
</style>

<!-- ANNOUNCEMENT MAKER -->
<div class="flex flex-col">
    {#if editor}
      <div class="control-group">
        <div class="button-group flex-wrap gap-1">
          <button
            onclick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            class={editor.isActive("bold") ? "is-active" : ""}
          >
            <Bold />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            class={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            class={editor.isActive("strike") ? "is-active" : ""}
          >
            <Strikethrough />
          </button>
          
          <button onclick={() => editor.chain().focus().unsetAllMarks().run()}>
              <RemoveFormatting />
          </button>

          <button
            onclick={() => editor.chain().focus().setParagraph().run()}
            class={editor.isActive("paragraph") ? "is-active" : ""}
          >
            Paragraph
          </button>
          
          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            class={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          >
            <Heading1 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            class={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          >
            <Heading2 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          >
            <Heading3 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            class={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
          >
            <Heading4 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            class={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
          >
            <Heading5 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            class={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
          >
            <Heading6 />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleBulletList().run()}
            class={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <List />
          </button>

          <button
            onclick={() => editor.chain().focus().toggleOrderedList().run()}
            class={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <ListOrdered />
          </button>

          <button onclick={() => editor.chain().focus().setHorizontalRule().run()}>
            <SeparatorHorizontal />
          </button>

          <button onclick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>

          <button
            onclick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo2 />
          </button>

          <button
            onclick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo2 />
          </button>

          <button 
            onclick={() => editor.chain().focus().setColor(hex).run()}
          >
          <PaintBucket />
          </button>
            
          <ColorPicker bind:hex bind:rgb bind:hsv bind:color />

          
        </div>
      </div>
    {:else}
      <p>Loading Announcement Maker...</p>
    {/if}
    <br>
</div>
<div bind:this={element} class="p-1 border-5 border-gray-800 border-2"></div>
<br>
<form action="?/postAnnouncement" method="POST">
  <input type="hidden" value="{editorHTML}" name="announcement_content">
  <Button type="submit">Post Announcement</Button>
</form>

<br>

<!-- ANNOUNCEMENT REMOVER -->
{#each data.reverse() as announcement}
  <form method="POST" action="?/deleteAnnouncement" use:enhance>
  <Button variant="destructive" type="submit">Remove Announcement</Button>
    <div class="rounded-sm border-2 p-5">
      {@html announcement.richhtml}
    </div>
    <input type="hidden" value="{announcement.id}" name="announcement_id">
    <Separator />
  </form>
{/each}