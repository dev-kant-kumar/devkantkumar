/**
 * Centralized utility for service-related calculations to ensure consistency
 * across different dashboard views.
 */

export const calculateProjectProgress = (order) => {
  if (!order) return 0;
  if (order.status === 'completed' || order.status === 'delivered') return 100;
  if (order.status === 'cancelled') return 0;

  // If we have a specific currentPhase, use that for more granular progress
  if (order.timeline && order.timeline.length > 0) {
    const completedStatuses = order.timeline.map(entry => entry.status);

    // SDLC Phase Weights — statuses match what completePhase stores (phaseKey itself)
    if (completedStatuses.includes('support_window')) return 97;
    if (completedStatuses.includes('revision_window')) return 92;
    if (completedStatuses.includes('delivery')) return 82;
    // Legacy: 'delivered' may appear from older markDelivered / updateAdminOrderStatus flows.
    // Intentionally the same value as 'delivery' since both represent the same milestone.
    if (completedStatuses.includes('delivered')) return 82;
    if (completedStatuses.includes('testing_qa')) return 75;
    if (completedStatuses.includes('development')) return 65;
    if (completedStatuses.includes('design')) return 40;
    if (completedStatuses.includes('planning_scoping')) return 25;
    if (completedStatuses.includes('legal_documentation')) return 15;
    if (completedStatuses.includes('requirements_gathering') || completedStatuses.includes('payment_completed')) return 10;
  }

  // Fallback to basic status-based progress if timeline is unavailable
  switch (order.status) {
    case 'confirmed': return 10;
    case 'in_progress': return 25;
    case 'pending': return 5;
    default: return 0;
  }
};
