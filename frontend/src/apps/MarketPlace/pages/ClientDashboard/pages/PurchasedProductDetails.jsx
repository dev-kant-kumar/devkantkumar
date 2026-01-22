import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Book, Code, Copy, Download, Edit, FileText, Loader2, Play, RefreshCw, Star, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../../../config/api';
import {
    useCreateReviewMutation,
    useDeleteReviewMutation,
    useGetProductReviewsQuery,
    useUpdateReviewMutation
} from '../../../store/api/marketplaceApi';
import { selectCurrentUser } from '../../../store/auth/authSlice';
import { useGetOrderByIdQuery, useRegenerateDownloadLinksMutation } from '../../../store/orders/ordersApi';

const PurchasedProductDetails = () => {
  const { orderId, productId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('downloads'); // downloads, license, support, reviews

  // Fetch Order Details
  const { data: orderData, isLoading: isOrderLoading, refetch: refetchOrder } = useGetOrderByIdQuery(orderId);
  const order = orderData?.data || orderData;

  // Regenerate Link Mutation
  const [regenerateLinks, { isLoading: isRegenerating }] = useRegenerateDownloadLinksMutation();

  // Find the specific item to get productId for review fetch
  const item = order?.items?.find(i =>
    (i.itemId?._id?.toString() === productId) ||
    (i.itemId?.toString() === productId) ||
    (i._id?.toString() === productId)
  );
  const product = item?.itemId && typeof item.itemId === 'object' ? item.itemId : null;

  // Review Hooks
  const { data: reviews = [] } = useGetProductReviewsQuery(product?._id, { skip: !product?._id });
  const [createReview, { isLoading: isReviewSubmitting }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdateSubmitting }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleteSubmitting }] = useDeleteReviewMutation();

  const currentUser = useSelector(selectCurrentUser);

  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // Download State
  const [downloadingIndex, setDownloadingIndex] = useState(null);

  // Find existing review
  const userReview = reviews.find(r =>
      (r.user._id === currentUser?._id) || (r.user === currentUser?._id)
  );

  // Pre-fill form if editing or just purely viewing (optional, but good for switching)
  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
    }
  }, [userReview]);

  // Handlers
  const handleCopyLicense = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('License key copied!');
  };

  const handleDownload = async (link, linkIndex) => {
    if (link.isExhausted) {
      toast.error('Download limit reached. Please regenerate links.');
      return;
    }
    if (link.isExpired) {
      toast.error('Link expired. Please regenerate.');
      return;
    }

    // Set loading state for this specific link
    setDownloadingIndex(linkIndex);



    try {
      // Use centralized API_URL from config
      const downloadUrl = `${API_URL}/marketplace/orders/${order._id}/items/${product._id}/download?token=${link.token}`;

      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please sign in to download files.');
        setDownloadingIndex(null);
        return;
      }

      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        // Try to parse error message
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Download failed');
        }
        throw new Error(`Download failed (${response.status})`);
      }

      // Get filename from Content-Disposition header or use link name
      let filename = link.name || 'download';
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=\s*(?:"([^"]*)"|[^;\n]*)/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Download started!');

      // Refetch order to update download count
      refetchOrder();
    } catch (err) {
      console.error('Download error:', err);
      toast.error(err.message || 'Download failed. Please try again.');
    } finally {
      setDownloadingIndex(null);
    }
  };

  const handleRegenerate = async () => {
    try {
      await regenerateLinks({
        orderId: order._id,
        itemId: product._id,
      }).unwrap();
      toast.success('Download links regenerated!');
      refetchOrder();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to regenerate links');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      if (isEditing) {
        await updateReview({
            productId: product._id,
            rating,
            comment
        }).unwrap();
        toast.success('Review updated successfully!');
        setIsEditing(false);
      } else {
        await createReview({
            productId: product._id,
            orderId: order._id, // Some backend checks might need this
            rating,
            comment
        }).unwrap();
        toast.success('Review submitted successfully!');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save review');
    }
  };

  const handleDeleteReview = async () => {
      if(!window.confirm("Are you sure you want to delete this review?")) return;

      try {
          await deleteReview({ productId: product._id }).unwrap();
          toast.success("Review deleted successfully");
          setRating(5);
          setComment("");
          setIsEditing(false);
      } catch (err) {
          toast.error(err?.data?.message || "Failed to delete review");
      }
  };

  if (isOrderLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!order || !item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold text-gray-900">Product not found</h3>
        <button onClick={() => navigate('/marketplace/dashboard/products')} className="mt-4 text-green-600 hover:underline">
          Back to My Products
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* Header / Back */}
      <div>
        <button
          onClick={() => navigate('/marketplace/dashboard/products')}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to My Products
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6">
          <div className="h-32 w-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
             {product?.images?.[0]?.url ? (
               <img src={product.images[0].url} alt={item.title} className="h-full w-full object-cover" />
             ) : (
                <div className="h-full w-full flex items-center justify-center">
                    <Code className="h-10 w-10 text-gray-400" />
                </div>
             )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{item.title}</h1>
                <p className="text-sm text-gray-500 mb-4">
                  Version {product?.version || '1.0.0'} • Purchased on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {item.licenseType || 'Standard License'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
               {/* Quick Stats or Info could go here if needed */}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Content - Left Col */}
        <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['downloads', 'license', 'support', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[300px]">

                {/* Downloads Tab */}
                {activeTab === 'downloads' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                           <h2 className="text-lg font-bold text-gray-900">Download Files</h2>
                           <button
                             onClick={handleRegenerate}
                             disabled={isRegenerating}
                             className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center"
                           >
                             <RefreshCw className={`h-4 w-4 mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
                             Regenerate Links
                           </button>
                        </div>

                        {item.downloadLinks && item.downloadLinks.length > 0 ? (
                           <div className="space-y-4">
                             {item.downloadLinks.map((link, idx) => {
                               const isExpired = new Date(link.expiresAt) < new Date();
                               const isExhausted = link.downloadCount >= link.maxDownloads;

                               return (
                                 <div key={idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors">
                                    <div className="flex items-center gap-3">
                                       <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                          <FileText className="h-5 w-5" />
                                       </div>
                                       <div>
                                          <p className="font-medium text-gray-900">{link.name || `File ${idx + 1}`}</p>
                                          <p className="text-xs text-gray-500">
                                            {isExpired ? (
                                                <span className="text-red-600">Expired</span>
                                            ) : isExhausted ? (
                                                <span className="text-red-600">Limit Reached</span>
                                            ) : (
                                                <span className="text-green-600">Active • Expires {new Date(link.expiresAt).toLocaleDateString()}</span>
                                            )}
                                          </p>
                                       </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                       <div className="text-right hidden sm:block">
                                          <p className="text-xs text-gray-500">Downloads</p>
                                          <p className="text-sm font-medium text-gray-900">{link.downloadCount} / {link.maxDownloads}</p>
                                       </div>
                                       <button
                                         onClick={() => handleDownload(link, idx)}
                                         disabled={isExpired || isExhausted || downloadingIndex === idx}
                                         className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                         title={downloadingIndex === idx ? "Downloading..." : "Download"}
                                       >
                                          {downloadingIndex === idx ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                          ) : (
                                            <Download className="h-5 w-5" />
                                          )}
                                       </button>
                                    </div>
                                 </div>
                               );
                             })}
                           </div>
                        ) : (
                            <div className="text-center py-10 text-gray-500">
                                <p>No specific download links found. Try regenerating.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* License Tab */}
                {activeTab === 'license' && (
                    <div className="space-y-6">
                         <h2 className="text-lg font-bold text-gray-900 mb-4">License Information</h2>

                         <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">License Key</label>
                            <div className="flex gap-2">
                                <code className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm text-gray-800 break-all">
                                    {item.licenseKey || 'No license key generated'}
                                </code>
                                <button
                                  onClick={() => handleCopyLicense(item.licenseKey)}
                                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                  title="Copy License"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Keep this key private. It is required for product activation and support.
                            </p>
                         </div>

                         <div className="prose prose-sm max-w-none text-gray-600">
                            <h3 className="text-gray-900 font-medium text-base">License Type: {item.licenseType || 'Standard'}</h3>
                            <p>
                                This license grants you a non-exclusive, non-transferable right to use the product for
                                {item.licenseType === 'extended' ? ' active commercial projects' : ' personal and commercial projects'}.
                            </p>
                            {/* Detailed license text could go here */}
                         </div>
                    </div>
                )}

                {/* Support Tab */}
                {activeTab === 'support' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Support & Resources</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product?.documentationUrl && (
                                <a href={product.documentationUrl} target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:ring-1 hover:ring-green-500 transition-all group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                                            <Book className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Documentation</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">Read the setup guide and API references.</p>
                                </a>
                            )}

                            {product?.demoUrl && (
                                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                                            <Play className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Live Demo</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">View the product in action.</p>
                                </a>
                            )}

                             {product?.sourceCodeUrl && (
                                <a href={product.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="p-4 border border-gray-200 rounded-lg hover:border-gray-500 hover:ring-1 hover:ring-gray-500 transition-all group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-gray-200 transition-colors">
                                            <Code className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Source Code</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">Access the repository (if applicable).</p>
                                </a>
                            )}
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-6">
                            <h3 className="font-semibold text-blue-900 mb-1">Need help?</h3>
                            <p className="text-sm text-blue-700 mb-3">Contact our support team if you face any issues with installation or activation.</p>
                            <Link to="/contact" className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                Contact Support &rarr;
                            </Link>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                            {userReview && !isEditing ? 'Your Review' : (isEditing ? 'Update Review' : 'Write a Review')}
                        </h2>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                             {!isEditing && userReview ? (
                                 <div>
                                     <div className="flex justify-between items-start mb-4">
                                         <div className="flex gap-1">
                                             {[1, 2, 3, 4, 5].map((star) => (
                                                 <Star
                                                     key={star}
                                                     className={`h-5 w-5 ${
                                                         star <= userReview.rating
                                                         ? 'fill-yellow-400 text-yellow-400'
                                                         : 'text-gray-300'
                                                     }`}
                                                 />
                                             ))}
                                         </div>
                                         <div className="flex gap-2">
                                             <button
                                                 onClick={() => setIsEditing(true)}
                                                 className="p-2 text-gray-500 hover:text-green-600 hover:bg-white rounded-lg transition-all"
                                                 title="Edit Review"
                                             >
                                                 <Edit className="h-4 w-4" />
                                             </button>
                                             <button
                                                 onClick={handleDeleteReview}
                                                 disabled={isDeleteSubmitting}
                                                 className="p-2 text-gray-500 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                                                 title="Delete Review"
                                             >
                                                 {isDeleteSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                             </button>
                                         </div>
                                     </div>
                                     <p className="text-gray-700 whitespace-pre-wrap">{userReview.comment}</p>
                                     <p className="text-xs text-gray-400 mt-4">
                                         Posted on {new Date(userReview.createdAt).toLocaleDateString()}
                                     </p>
                                 </div>
                             ) : (
                                 <form onSubmit={handleSubmitReview}>
                                     <div className="mb-4">
                                         <div className="flex justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-700">Your Rating</label>
                                            {isEditing && (
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                                                >
                                                    <X className="h-3 w-3 mr-1" /> Cancel
                                                </button>
                                            )}
                                         </div>
                                         <div className="flex gap-1">
                                             {[1, 2, 3, 4, 5].map((star) => (
                                                 <button
                                                   key={star}
                                                   type="button"
                                                   className="focus:outline-none transition-transform hover:scale-110"
                                                   onMouseEnter={() => setHoveredStar(star)}
                                                   onMouseLeave={() => setHoveredStar(0)}
                                                   onClick={() => setRating(star)}
                                                 >
                                                     <Star
                                                        className={`h-8 w-8 ${
                                                            star <= (hoveredStar || rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                        } transition-colors`}
                                                     />
                                                 </button>
                                             ))}
                                         </div>
                                     </div>

                                     <div className="mb-4">
                                         <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                                         <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none text-sm"
                                            placeholder="Share your experience with this product..."
                                         ></textarea>
                                     </div>

                                     <button
                                       type="submit"
                                       disabled={isReviewSubmitting || isUpdateSubmitting}
                                       className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                     >
                                         {(isReviewSubmitting || isUpdateSubmitting) && <Loader2 className="h-4 w-4 animate-spin" />}
                                         {isEditing ? 'Update Review' : 'Submit Review'}
                                     </button>
                                 </form>
                             )}
                        </div>
                    </div>
                )}

            </div>
        </div>

        {/* Sidebar - Right Col */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Order Ref</span>
                        <span className="font-medium text-gray-900">{order.orderNumber}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-500">Total Status</span>
                         <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${
                            order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                         }`}>
                             {order.status}
                         </span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link
                       to={`/marketplace/dashboard/orders/${order._id}/invoice`}
                       className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        View Invoice
                    </Link>
                </div>
            </div>

            {/* Upsell or Related items could go here */}
        </div>
      </div>
    </motion.div>
  );
};

export default PurchasedProductDetails;
