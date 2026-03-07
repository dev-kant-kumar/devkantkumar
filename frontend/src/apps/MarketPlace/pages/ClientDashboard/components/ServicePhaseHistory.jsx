import { Clock, Download, FileText, Link as LinkIcon } from 'lucide-react';

const PHASE_NAMES = {
  requirements_gathering: "Requirements Gathering",
  legal_documentation: "Legal & Documentation",
  planning_scoping: "Planning & Scoping",
  design: "Design",
  development: "Development",
  testing_qa: "Testing & QA",
  delivery: "Delivery",
  revision_window: "Revision Window",
  support_window: "Support Window",
  completed: "Completed"
};

const ServicePhaseHistory = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  // Filter for timeline items that represent phase completions with deliverables
  const deliverableEvents = timeline.filter(entry =>
    Object.keys(PHASE_NAMES).includes(entry.status) &&
    (entry.deliverableUrl || entry.externalLink || entry.notes)
  );

  if (deliverableEvents.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          Phase Deliverables History
        </h3>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {deliverableEvents.reverse().map((entry, idx) => (
            <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-base font-bold text-gray-900">
                    {PHASE_NAMES[entry.status] || entry.status.replace('_', ' ')} completed
                  </h4>
                  <span className="text-xs text-gray-500 flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                    <Clock className="h-3 w-3" />
                    {new Date(entry.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {entry.notes && (
                  <div className="mt-3">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Admin Notes</p>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100 whitespace-pre-wrap">
                      {entry.notes}
                    </p>
                  </div>
                )}

                {(entry.deliverableUrl || entry.externalLink) && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {entry.deliverableUrl && (
                      <a
                        href={entry.deliverableUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                      >
                        <div className="h-8 w-8 bg-indigo-50 rounded flex items-center justify-center flex-shrink-0">
                          <Download className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-600 transition-colors">Download File</p>
                          <p className="text-xs text-gray-500 truncate">Deliverable Archive</p>
                        </div>
                      </a>
                    )}

                    {entry.externalLink && (
                      <a
                        href={entry.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all group"
                      >
                        <div className="h-8 w-8 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                          <LinkIcon className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">External Link</p>
                          <p className="text-xs text-gray-500 truncate">
                            {(() => {
                              try {
                                return new URL(entry.externalLink).hostname;
                              } catch (e) {
                                return 'View Link';
                              }
                            })()}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePhaseHistory;
