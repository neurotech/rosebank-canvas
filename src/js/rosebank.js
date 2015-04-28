// Grab the course ID portion of the current URL
var path = window.location.pathname.split('/')[2];

// URL to custom CSS file for hiding the sidebar
var sidebar = 'https://s3-ap-southeast-2.amazonaws.com/rosebank-canvas/css/sidebar.min.css';

// ID 187 = Learning Resources
if (path === '187') {
  $('head').append('<link rel="stylesheet" href="' + sidebar + '" type="text/css" media="all" />');
}

// Add Learning Resources link to navbar
$('ul#menu').append('<li id="extra_menu_item" class="menu-item"><a href="/courses/187" class="menu-item-no-drop">Learning Resources</a></li>');

