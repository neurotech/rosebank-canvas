// Grab the course ID portion of the current URL
var path = window.location.pathname.split('/');

// URL to custom CSS file for hiding the sidebar
var sidebar = 'https://s3-ap-southeast-2.amazonaws.com/rosebank-canvas/css/sidebar.min.css';

// Log the currently logged in user's role data
console.log('Current role data: ' + ENV.current_user_roles);

// ID 187 = Learning Resources
if (path[2] === '187') {
  $('head')
    .append('<link rel="stylesheet" href="' + sidebar + '" type="text/css" media="all" />');
}

// Add Learning Resources link to navbar
$('<li id="extra_menu_item" class="menu-item"><a href="/courses/187" class="menu-item-no-drop">Learning Resources</a></li>')
  .hide()
  .appendTo("ul#menu")
  .fadeIn(300);

// Change any reference to 'Marks' to 'Results & Feedback'
var marksFor = $('div#content[role="main"] h2')
  .first()
  .text()
  .split(' ');

$('li a.grades').text('Results & Feedback');
$('nav#breadcrumbs ul li a[href*="/grades"]').first().text('Results & Feedback');
$('li#grades_menu_item a').text('Results & Feedback');
$('table td.percent span').text('no results');
$('a.print-grades').text('Print results');

if (path[3] === 'grades') {
  $('div#content[role="main"] h2').text('Results ' + marksFor[1] + ' ' + marksFor[5] + ' ' + marksFor[6]);
}