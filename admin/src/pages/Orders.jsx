import React, { useContext, useEffect, useState, useMemo } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  
  const { serverUrl } = useContext(authDataContext);

  // Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, [serverUrl]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );
      
      const ordersData = res.data.data || res.data.orders || [];
      setOrders(Array.isArray(ordersData) ? ordersData.reverse() : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!orderId || !newStatus) return;
    
    try {
      setUpdatingOrderId(orderId);
      await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: newStatus },
        { withCredentials: true }
      );
      
      // Update local state instead of refetching
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      alert('Status updated successfully!');
    } catch (error) {
      console.error("Failed to update status:", error);
      alert(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Filter and sort orders - Memoized for performance
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      // Status filter
      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }
      
      // Search filter
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        return (
          order._id?.toLowerCase().includes(search) ||
          order.name?.toLowerCase().includes(search) ||
          order.userId?.name?.toLowerCase().includes(search) ||
          order.address?.firstName?.toLowerCase().includes(search) ||
          order.address?.lastName?.toLowerCase().includes(search) ||
          order.status?.toLowerCase().includes(search)
        );
      }
      
      return true;
    });

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
        case 'date-asc':
          return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
        case 'amount-desc':
          return (b.amount || 0) - (a.amount || 0);
        case 'amount-asc':
          return (a.amount || 0) - (b.amount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, searchTerm, statusFilter, sortBy]);

  // Format amount correctly
  const formatAmount = (amount) => {
    if (amount === null || amount === undefined || amount === '') return '₹0';
    const numAmount = Number(amount);
    return isNaN(numAmount) ? '₹0' : `₹${numAmount.toLocaleString('en-IN')}`;
  };

  // Get customer name safely
  const getCustomerName = (order) => {
    if (order.address?.firstName && order.address?.lastName) {
      return `${order.address.firstName} ${order.address.lastName}`;
    }
    if (order.userId?.name) return order.userId.name;
    if (order.customerName) return order.customerName;
    if (order.name) return order.name;
    return 'N/A';
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'out for delivery': 'bg-indigo-100 text-indigo-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Statistics
  const stats = useMemo(() => ({
    total: orders.length,
    active: orders.filter(o => o.status !== 'cancelled' && o.status !== 'delivered').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalRevenue: orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0)
  }), [orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Nav />
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Nav />
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-red-600 mb-4">Error: {error}</p>
              <button
                onClick={fetchOrders}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden ml-0 md:ml-10 mt-0 md:mt-10">  
      {/* Background blur effects - hidden on mobile */}
      <div className="hidden lg:block absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
      <div className="hidden lg:block absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />
      
      <Nav />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        
        {/* Main Content - Responsive padding and margins */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:pl-24">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Orders Dashboard</h1>
            
            {/* Statistics Cards - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-xs sm:text-sm">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-xs sm:text-sm">Active Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-xs sm:text-sm">Delivered</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.delivered}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <p className="text-gray-600 text-xs sm:text-sm">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{formatAmount(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>

          {/* Filters and Search - Responsive */}
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Search */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Filter by Status</label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Sort by</label>
                <select
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-desc">Date (Newest First)</option>
                  <option value="date-asc">Date (Oldest First)</option>
                  <option value="amount-desc">Amount (High to Low)</option>
                  <option value="amount-asc">Amount (Low to High)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table/Cards - Responsive Design */}
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all' 
                          ? 'No orders match your filters' 
                          : 'No orders found'}
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{order._id?.slice(-8) || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">{getCustomerName(order)}</div>
                          <div className="text-xs text-gray-500">{order.address?.phone || 'N/A'}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items?.map((item, index) => (
                              <div key={index} className="truncate max-w-xs">
                                {item.name} × {item.quantity}
                                {item.size && ` (${item.size})`}
                              </div>
                            )) || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {order.items?.length || 0} item(s)
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatAmount(order.amount)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.paymentMethod || 'N/A'}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.payment 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.payment ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                          {formatDate(order.date || order.createdAt)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <select
                            className="px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                            value={order.status || ''}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            disabled={updatingOrderId === order._id}
                          >
                            <option value="">Update Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="out for delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {filteredAndSortedOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No orders match your filters' 
                  : 'No orders found'}
              </div>
            ) : (
              filteredAndSortedOrders.map((order) => (
                <div key={order._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Order #{order._id?.slice(-8) || 'N/A'}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(order.date || order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatAmount(order.amount)}
                      </p>
                      <span className={`mt-1 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Customer</p>
                    <p className="text-sm font-medium text-gray-900">{getCustomerName(order)}</p>
                    <p className="text-xs text-gray-600">{order.address?.phone || 'N/A'}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Items ({order.items?.length || 0})</p>
                    <div className="space-y-1">
                      {order.items?.map((item, index) => (
                        <p key={index} className="text-sm text-gray-700">
                          {item.name} × {item.quantity}
                          {item.size && ` (${item.size})`}
                        </p>
                      )) || 'N/A'}
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="text-sm text-gray-700">{order.paymentMethod || 'N/A'}</p>
                    </div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.payment 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.payment ? 'Paid' : 'Pending'}
                    </span>
                  </div>

                  {/* Action */}
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Update Status</label>
                    <select
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                      value={order.status || ''}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      disabled={updatingOrderId === order._id}
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="out for delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Results Count */}
          {filteredAndSortedOrders.length > 0 && (
            <div className="mt-4 text-xs sm:text-sm text-gray-600 text-center">
              Showing {filteredAndSortedOrders.length} of {orders.length} orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;