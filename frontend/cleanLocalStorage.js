// Quick script to clean up corrupted localStorage data
// Run this in the browser console if you're still seeing errors

console.log('🧹 Cleaning up localStorage...');

// Check current values
console.log('Current adminToken:', localStorage.getItem('adminToken'));
console.log('Current adminUser:', localStorage.getItem('adminUser'));
console.log('Current adminLastLogin:', localStorage.getItem('adminLastLogin'));

// Remove all admin-related items
localStorage.removeItem('adminToken');
localStorage.removeItem('adminUser');
localStorage.removeItem('adminLastLogin');

console.log('✅ localStorage cleaned!');
console.log('Please refresh the page.');
