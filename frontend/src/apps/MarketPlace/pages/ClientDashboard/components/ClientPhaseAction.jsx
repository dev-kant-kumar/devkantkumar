import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Clock, FileText } from 'lucide-react';

const ClientPhaseAction = ({ order, setActiveTab }) => {
  const currentPhase = order?.currentPhase || 'requirements_gathering';
  const reqStatus = order?.requirementsData?.status || 'pending';

  // Helper to render the action card content based on phase and status
  const getActionContent = () => {
    switch (currentPhase) {
      case 'requirements_gathering':
        if (reqStatus === 'pending') {
          return {
            title: "Action Required: Submit Requirements",
            description: "To start your project, we need you to provide some initial requirements. Once submitted, our team can begin work.",
            buttonLabel: "Submit Requirements Now",
            icon: FileText,
            color: "blue",
            action: () => setActiveTab('activity'),
            showButton: true
          };
        }
        if (reqStatus === 'submitted' || reqStatus === 'resubmitted') {
          return {
            title: "Requirements Under Review",
            description: "Great! You've submitted the requirements. Our team is currently reviewing them to ensure we have everything needed.",
            buttonLabel: "View Submission",
            icon: Clock,
            color: "amber",
            action: () => setActiveTab('activity'),
            showButton: true
          };
        }
        if (reqStatus === 'changes_requested') {
          return {
            title: "Action Required: Update Requirements",
            description: "The admin has requested some changes or clarifications on your submitted requirements.",
            buttonLabel: "Fix Requirements",
            icon: AlertCircle,
            color: "red",
            action: () => setActiveTab('activity'),
            showButton: true
          };
        }
        return null;

      case 'legal_documentation':
        return {
          title: "Legal & Documentation Phase",
          description: "Our team is preparing the necessary legal agreements and documentation for your signature.",
          icon: FileText,
          color: "indigo",
          showButton: false
        };

      case 'planning_scoping':
        return {
          title: "Planning & Scoping Phase",
          description: "We are mapping out your project in detail — milestones, timelines, and technical architecture. You'll receive a scope document for your approval before development begins.",
          icon: Clock,
          color: "purple",
          showButton: false
        };

      case 'design':
      case 'development':
      case 'testing_qa':
        return {
          title: `Project ${currentPhase.replace('_', ' ').charAt(0).toUpperCase() + currentPhase.replace('_', ' ').slice(1)}`,
          description: `Our team is currently working hard on the ${currentPhase.replace('_', ' ')} phase. We'll update you as soon as there's a deliverable for your review.`,
          icon: Clock,
          color: "purple",
          showButton: false
        };

      case 'delivery':
        return {
          title: "Final Delivery Pending",
          description: "The project has reached the delivery stage! The admin is preparing the final package for your approval.",
          icon: CheckCircle,
          color: "green",
          showButton: false
        };

      default:
        return {
          title: "Working on your project",
          description: `Current Phase: ${currentPhase.replace('_', ' ')}. We'll notify you of any actions required.`,
          icon: Clock,
          color: "gray",
          showButton: false
        };
    }
  };

  const content = getActionContent();
  if (!content) return null;

  const Icon = content.icon;
  const colorMap = {
    blue: "bg-blue-50 border-blue-200 text-blue-900 icon-bg-blue-500",
    amber: "bg-amber-50 border-amber-200 text-amber-900 icon-bg-amber-500",
    red: "bg-red-50 border-red-200 text-red-900 icon-bg-red-500",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-900 icon-bg-indigo-500",
    purple: "bg-purple-50 border-purple-200 text-purple-900 icon-bg-purple-500",
    green: "bg-green-50 border-green-200 text-green-900 icon-bg-green-500",
    gray: "bg-gray-50 border-gray-200 text-gray-900 icon-bg-gray-500"
  };

  const currentStyles = colorMap[content.color] || colorMap.gray;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-6 border ${currentStyles.split(' ').slice(0, 2).join(' ')} shadow-sm mb-8`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 ${currentStyles.split(' ')[3].replace('icon-bg-', 'bg-')}`}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        <div className="flex-1">
          <h3 className={`text-xl font-bold ${currentStyles.split(' ')[2]}`}>
            {content.title}
          </h3>
          <p className="text-gray-600 mt-1 max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>

        {content.showButton && (
          <button
            onClick={content.action}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-xl text-sm font-bold shadow-sm border border-gray-200 transition-all hover:shadow-md hover:-translate-y-0.5 group"
          >
            {content.buttonLabel}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ClientPhaseAction;
