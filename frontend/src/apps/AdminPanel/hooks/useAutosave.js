import { useCallback, useEffect, useRef, useState } from "react";

const AUTOSAVE_DELAY = 2000; // 2 seconds debounce

/**
 * Autosave hook — persists form data to localStorage with debounce.
 *
 * @param {string} storageKey  - unique key, e.g. "product-draft" or "service-draft"
 * @param {object} formData    - the current form state
 * @param {function} setFormData - setter for form state (useState)
 * @param {object|null} initialData - if editing, the server-side data (skips autosave restore)
 * @returns {{ hasDraft, draftTimestamp, restoreDraft, clearDraft, ignoreDraft }}
 */
export default function useAutosave(
  storageKey,
  formData,
  setFormData,
  initialData,
) {
  const [hasDraft, setHasDraft] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState(null);
  const timerRef = useRef(null);
  const isRestoringRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // Build the actual key (append id when editing)
  const key = initialData?._id
    ? `${storageKey}-${initialData._id}`
    : `${storageKey}-new`;

  // On mount, check for existing draft
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;

      const saved = JSON.parse(raw);
      if (!saved || !saved.data) return;

      // For editing, skip restore if draft is older than initialData
      // For new forms, always offer restore if draft has meaningful content
      const hasContent =
        saved.data.title?.trim() || saved.data.description?.trim();
      if (hasContent) {
        setHasDraft(true);
        setDraftTimestamp(saved.timestamp);
      }
    } catch {
      // Corrupted data — remove it
      localStorage.removeItem(key);
    }
  }, [key]);

  // Debounced save on formData changes
  useEffect(() => {
    // Don't save while we're restoring
    if (isRestoringRef.current) {
      isRestoringRef.current = false;
      return;
    }

    // Don't save empty/default form data on first render
    const hasContent = formData.title?.trim() || formData.description?.trim();
    if (!hasContent) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      try {
        const payload = { data: formData, timestamp: Date.now() };
        localStorage.setItem(key, JSON.stringify(payload));
      } catch {
        // localStorage full or unavailable — silently ignore
      }
    }, AUTOSAVE_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [formData, key]);

  const restoreDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved?.data) {
        isRestoringRef.current = true;
        setFormData(saved.data);
        setHasDraft(false);
      }
    } catch {
      localStorage.removeItem(key);
    }
  }, [key, setFormData]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(key);
    setHasDraft(false);
    setDraftTimestamp(null);
  }, [key]);

  const ignoreDraft = useCallback(() => {
    // User chose to discard — remove draft and hide banner
    localStorage.removeItem(key);
    setHasDraft(false);
    setDraftTimestamp(null);
  }, [key]);

  return { hasDraft, draftTimestamp, restoreDraft, clearDraft, ignoreDraft };
}
