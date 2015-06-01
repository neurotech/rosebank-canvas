// Grab the course ID portion of the current URL
var path = window.location.pathname.split('/');

// URL to custom CSS file for hiding the sidebar
var sidebar = 'https://s3-ap-southeast-2.amazonaws.com/rosebank-canvas/css/sidebar.min.css';

// @return [integer] a random int between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(function() {
  // Log the currently logged in user's role data
  console.log('Current role data: ' + ENV.current_user_roles);

  // Top Navigation
  // --------------

  // ID 187 = Learning Resources
  if (path[2] === '187') {
    $('head').append('<link rel="stylesheet" href="' + sidebar + '" type="text/css" media="all" />');
  }

  // Add 'Learning Resources' link
  $('<li id="extra_menu_item" class="menu-item"><a href="/courses/187" class="menu-item-no-drop">Learning Resources</a></li>')
    .hide()
    .appendTo('ul#menu')
    .fadeIn(300);

  // Side Navigation
  // ---------------

  $('li a.syllabus').text('Course Description');
  $('li a.assignments').text('Tasks');
  $('li a.grades').text('Results & Feedback');

  /*
    Language Changes
    ----------------
  */

  /*
    [1] 'Marks'/'Grades' becomes 'Results & Feedback'
    -------------------------------------------------
  */

  $('nav#breadcrumbs ul li a[href*="/grades"]').first().text('Results & Feedback');
  $('li#grades_menu_item a').text('Results & Feedback');
  $('table td.percent span').text('no results');
  $('a.print-grades').text('Print results');

  if (path[3] === 'grades') {
    // H2
    var h2 = $('div#content[role="main"] h2').first().text().split(' ');
    $('div#content[role="main"] h2').text('Results ' + h2[1] + ' ' + h2[5] + ' ' + h2[6]);

    // Page Title
    var pageTitle = $('title').first().text().split(' ');
    $('title').text('Results ' + pageTitle[1] + ' ' + pageTitle[2] + ' ' + pageTitle[3].slice(0, -1));
  }

  if (path[3] === 'gradebook') {
    // Wait between 1 and 2 seconds for /gradebook DOM weirdness
    setTimeout(function() {
      $('#main h1').text('Results & Feedback: Individual View');
      $('#main em').text('Note: Results, feedback, and notes will be saved automatically after moving out of the field.');
      $('label[for="arrange_assignments"]').text('Sort tasks');
      $('label[for="assignment_select"]').text('Select a task');
      $('#main h4').text('Results & Feedback');
      $('p:contains("Select a student and an assignment to view and edit marks.")').text('Select a student and a task to view and edit results.');
      $('p:contains("Select an assignment to view additional information here.")').text('Select a task to view additional information here.');
      $('h2:contains("Assignment Information")').text('Task Information');
      $('button[type="submit"]:contains("Update Mark")').text('Update Result');
    }, getRandomInt(1000, 2000));
  }

  /*
    [2] 'Assignments' becomes 'Tasks'
    ---------------------------------
  */

  $('nav#breadcrumbs ul li span:contains("Assignments")').text('Tasks');

  if (path[3] === 'assignments') {
    setTimeout(function() {
      $('input[placeholder="Search for Assignment"]').attr('placeholder', 'Search for Task').attr('aria-label', 'Search for Task');
      $('a#addGroup').attr('title', 'Add Task Group').attr('aria-label', 'Add Task Group');
      $('a.new_assignment').text('Task').attr('title', 'New Task').attr('aria-label', 'New Task');
      $('a#assignmentSettingsCog').attr('title', 'Task Settings').attr('aria-label', 'Task Settings');
      $('input[placeholder="Assignment Name"]').attr('placeholder', 'Task Name').attr('aria-label', 'Task Name');
      $('label[for="assignment_group_id"]').text('Task Group');
      $('label[for="assignment_grading_type"]').text('Display Result as');
      $('div.form-column-left:contains("Group Assignment")').text('Group Task');
      $('em:contains("visible to the section")').html('Note: This task is <strong>only</strong> visible to the section(s) specified below:');
    }, getRandomInt(1000, 2000));
  }
  /*
    [3] 'Syllabus' becomes 'Course Description'
    -------------------------------------------
  */

  $('nav#breadcrumbs ul li span:contains("Syllabus")').text('Course Description');

  if (path[4] === 'syllabus') {
    $('#main h1').text('Course Description');
    $('a.edit_syllabus_link').html('<i class="icon-edit"></i> Edit Course Description');
    $('label[for="course_syllabus_body"').hide();
    $('button:contains("Update Syllabus")').text('Update');
  }
});