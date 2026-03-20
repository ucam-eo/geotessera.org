<script lang="ts">
  interface Props {
    leftSrc: string;
    rightSrc: string;
    leftLabel?: string;
    rightLabel?: string;
    alt?: string;
  }

  let { leftSrc, rightSrc, leftLabel = '', rightLabel = '', alt = 'Image comparison' }: Props = $props();

  let container: HTMLDivElement;
  let position = $state(50);
  let dragging = $state(false);

  function updatePosition(clientX: number) {
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    position = Math.max(0, Math.min(100, (x / rect.width) * 100));
  }

  function onPointerDown(e: PointerEvent) {
    dragging = true;
    container.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    e.preventDefault();
    updatePosition(e.clientX);
  }

  function onPointerUp() {
    dragging = false;
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      position = Math.max(0, position - 2);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      position = Math.min(100, position + 2);
      e.preventDefault();
    }
  }
</script>

<div
  class="compare"
  bind:this={container}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
  onlostpointercapture={onPointerUp}
  onkeydown={onKeyDown}
  role="slider"
  aria-valuenow={Math.round(position)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={alt}
  tabindex="0"
>
  <!-- Right image sits in flow and sets the container's aspect ratio -->
  <img class="img" src={rightSrc} alt="{alt} — right" draggable="false" />

  <!-- Left image is absolutely positioned and clipped from the right -->
  <img
    class="img overlay"
    src={leftSrc}
    alt="{alt} — left"
    draggable="false"
    style="clip-path: inset(0 {100 - position}% 0 0)"
  />

  <!-- Divider line and drag handle -->
  <div class="divider" style="left: {position}%">
    <div class="handle">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 6 4 12 9 18" />
        <polyline points="15 6 20 12 15 18" />
      </svg>
    </div>
  </div>

  {#if leftLabel}
    <span class="label label-left" class:visible={position > 15}>{leftLabel}</span>
  {/if}
  {#if rightLabel}
    <span class="label label-right" class:visible={position < 85}>{rightLabel}</span>
  {/if}
</div>

<style>
  .compare {
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid var(--border-light);
    cursor: ew-resize;
    user-select: none;
    touch-action: pan-y;
    margin: 12px 0;
    line-height: 0;
  }

  .img {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
  }

  .divider {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: white;
    transform: translateX(-1px);
    pointer-events: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }

  .handle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.55);
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: background 0.15s;
  }

  .compare:hover .handle,
  .compare:focus-visible .handle {
    background: rgba(0, 0, 0, 0.7);
  }

  .handle svg {
    width: 18px;
    height: 18px;
    color: white;
  }

  .label {
    position: absolute;
    bottom: 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: white;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    padding: 4px 10px;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .label.visible {
    opacity: 1;
  }

  .label-left {
    left: 10px;
  }

  .label-right {
    right: 10px;
  }
</style>
