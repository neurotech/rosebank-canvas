// Grab the course ID portion of the current URL
var path = window.location.pathname.split('/');

// Rosebank Calendar HTML
var calendar = '<h4 class="rosebank-calendar">Rosebank Calendar</h4><div id="rbc-calendar"><iframe src="https://calendar.google.com/calendar/embed?showTitle=0&showTz=1&mode=AGENDA&height=400&wkst=2&src=rosebank.nsw.edu.au_7mc9b1ovepoeii25mh3pu3o8l8%40group.calendar.google.com&color=%23528800&src=rosebank.nsw.edu.au_cmf27oe74ggbe5fbdg8tf1a2l8%40group.calendar.google.com&color=%232952A3&src=rosebank.nsw.edu.au_b5ovt22501ffgv3igt9fltlik8%40group.calendar.google.com&color=%23A32929&src=rosebank.nsw.edu.au_5v3pg9qftun8shnl0h4iks94sg%40group.calendar.google.com&color=%23BE6D00&src=rosebank.nsw.edu.au_m4liq2rg04r8j5oq2b1uogdod8%40group.calendar.google.com&color=%235229A3&src=rosebank.nsw.edu.au_9viv52i6ti61f8op1ue98il0no%40group.calendar.google.com&color=%23B1365F&src=rosebank.nsw.edu.au_dm7hnfds2v5s7vnn6ahmuuh3bg%40group.calendar.google.com&color=%23333333&src=rosebank.nsw.edu.au_cc90g5ecu04nj2195ua0hemqok%40group.calendar.google.com&color=%231B887A&ctz=Australia%2FSydney" style="border-width:0;" width="100%" height="300" frameborder="0" scrolling="no"></iframe></div>';

// 'Learning Resources' Navigation Bar Element
var learningResources = '<a id="global_nav_learning-resources_link" href="/courses/187" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--learning-resources" viewBox="0 0 26.748 28"><path fill="#FFF" d="M14.257 9.055H3.225a.844.844 0 0 1 0-1.688h11.03a.844.844 0 1 1 .002 1.688zM14.257 12.134H3.225a.844.844 0 0 1 0-1.688h11.03a.844.844 0 0 1 .002 1.688zM14.257 15.212H3.225a.844.844 0 0 1 0-1.688h11.03a.844.844 0 0 1 .002 1.688zM14.73 19.37l-1.264-1.222-.697 1.917z"/><path fill="#FFF" d="M23.074 12.215V26.03c0 .153-.13.28-.28.28H9.25a.285.285 0 0 1-.28-.28v-2.55h6.543c1.086 0 1.97-.885 1.97-1.97v-3.8l-1.69 1.658v2.14c0 .153-.128.28-.28.28H1.97a.285.285 0 0 1-.28-.28V6.85h3.887c1.03 0 1.87-.838 1.87-1.87V1.615h8.066c.153 0 .28.13.28.28V14.87l1.69-1.66V6.136h5.31c.153 0 .28.13.28.28v1.3l1.657-1.627a1.97 1.97 0 0 0-1.937-1.642h-5.31v-2.55A1.97 1.97 0 0 0 16.017 0H6.292a.68.68 0 0 0-.256.145L.276 5.38a.836.836 0 0 0-.262.538c-.005 0-.01.002-.014.003v15.59c0 1.085.884 1.97 1.97 1.97h5.31v2.55c0 1.086.884 1.97 1.97 1.97h13.543c1.086 0 1.97-.884 1.97-1.97V10.555l-1.69 1.66zM5.76 2.68v2.3a.185.185 0 0 1-.183.182h-2.55L5.76 2.68z"/><path fill="#FFF" d="M25.25 6.366L14.215 17.21l1.497 1.45L26.748 7.816zM15.344 24.875a.677.677 0 1 0 1.354 0 .677.677 0 1 0-1.354 0"/></svg><span class="menu-item__badge" style="display: none">0</span></div><div class="menu-item__text">Learning Resources</div></a>';

// @return [integer] a random int between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(function() {
  var roles = ENV.current_user_roles;

  // Add Rosebank Calendar to Homepage
  $('#dashboard').append(calendar);

  /*
   Observer Redirect
   -----------------
  */
  if ($.inArray('observer', roles) >= 0) {
    if ($.inArray('grades', path) >= 0) {
      window.location.replace('https://rosebank.instructure.com/');
    }
  }

  /*
   Observer - Hide Recent Feedback
   -------------------------------
  */
  if ($.inArray('observer', roles) >= 0) {
    setTimeout(function () {
      $('#right-side .recent_feedback').remove();
    }, 1100);
  }

  /*
    'Learning Resources' Navigation Bar Element
    -------------------------------------------
  */
  $('ul#menu').append('<li class="menu-item ic-app-header__menu-list-item" id="learning-resources-link"></li>');
  setTimeout(function () {
    $('li#learning-resources-link')
      .hide()
      .html(learningResources)
      .fadeIn(100);
  }, 150);

  /*
    Language Changes: Side Navigation items
  */
  $('li a.syllabus').text('Course Description');
  $('li a.assignments').text('Tasks');
  $('li a.grades').text('Results & Feedback');

  /*
    Language Change: 'Marks'/'Grades' becomes 'Results & Feedback'
    --------------------------------------------------------------
  */

  // Change the View Grades button's text and show it if the logged-in user is not an observer.
  if ($.inArray('observer', roles) === -1) {
    setTimeout(function() {
      $('#right-side a[href="/grades"].Button')
        .text('View Results & Feedback')
        .css('display', 'block')
    }, getRandomInt(1500, 2500));
  }

  $('nav#breadcrumbs ul li a[href*="/grades"]').first().text('Results & Feedback');
  $('table.course_details.student_grades td.percent').text('no results');
  $('a.print-grades').text('Print results');

  // https://institution.instructure.com/grades
  if (path[1] === 'grades') {
    // Page Title
    var pageTitle = $('title:contains("Marks: ")');
    pageTitle.text(pageTitle.text().replace('Marks: ', 'Results: '));
  }

  // https://institution.instructure.com/courses/:id/grades
  if (path[3] === 'grades') {
    // "Results for Firstname Surname"
    var h2 = $('div#content[role="main"] h2').first().text().split(' ');
    $('div#content[role="main"] h2').text('Results ' + h2[1] + ' ' + h2[5] + ' ' + h2[6]);

    // Page Title
    var pageTitle = $('title:contains("Marks ")');
    pageTitle.text(pageTitle.text().replace('Marks: ', 'Results: '));
  }

  // https://institution.instructure.com/courses/:id/gradebook
  if (path[3] === 'gradebook') {
    // Wait between 1 and 2 seconds for /gradebook DOM weirdness
    setTimeout(function() {
      $('#main h1').text('Results & Feedback: Individual View');
      $('#main em').text('Note: Results, feedback, and notes will be saved automatically after moving out of the field.');
      $('label[for="arrange_assignments"]').text('Sort tasks');
      $('#main h4').text('Results & Feedback');
      $('p:contains("Select a student and an assignment to view and edit marks.")').text('Select a student and a task to view and edit results.');
      $('p:contains("Select an assignment to view additional information here.")').text('Select a task to view additional information here.');
      $('h2:contains("Assignment Information")').text('Task Information');
      $('button[type="submit"]:contains("Update Mark")').text('Update Result');
      $('div.assignment_navigation button.previous_object').text('Previous Task');
      $('div.assignment_navigation button.next_object').text('Next Task');
    }, getRandomInt(1000, 2000));
  }

  /*
    Language Change: 'Assignments' becomes 'Tasks'
    ----------------------------------------------
  */
  $('div#left-side a.assignments').text('Tasks');

  // https://institution.instructure.com/courses/:id/assignments
  if (path[3] === 'assignments') {
    // Wait between 1 and 2 seconds for /assignments DOM weirdness
    setTimeout(function() {
      $('input[placeholder="Search for Assignment"]').attr('placeholder', 'Search for Task').attr('aria-label', 'Search for Task');
      $('a#addGroup').attr('title', 'Add Task Group').attr('aria-label', 'Add Task Group');
      $('a.new_assignment').text('Task').attr('title', 'New Task').attr('aria-label', 'New Task');
      $('a#assignmentSettingsCog').attr('title', 'Task Settings').attr('aria-label', 'Task Settings');
      $('label[for="assignment_group_id"]').text('Task Group');
      $('label[for="assignment_grading_type"]').text('Display Result as');
      $('div.form-column-left:contains("Group Assignment")').text('Group Task');
      $('em:contains("visible to the section")').html('Note: This task is <strong>only</strong> visible to the section(s) specified below:');
    }, getRandomInt(1000, 2000));
  }

  /*
    Language Change: 'Syllabus' becomes 'Course Description'
    --------------------------------------------------------
  */
  $('div#left-side a.syllabus').text('Course Description');

  // https://institution.instructure.com/courses/:id/assignments/syllabus
  if (path[4] === 'syllabus') {
    $('#main #content h1').first().text('Course Description');
    $('a.edit_syllabus_link').html('<i class="icon-edit"></i> Edit Course Description');
    $('label[for="course_syllabus_body"').hide();
    $('button:contains("Update Syllabus")').text('Update');
    // Justyn will supply replacement language for the line below:
    $('div#course_syllabus_details').html('<p>The Course Description page shows a table-oriented view of the course schedule, and the basics of course grading.  You can add any other comments, notes, or thoughts you have about the course structure, course policies or anything else.</p><p>To add some comments, click the "Edit Course Description" link to the right.</p>');
  }

  /*
    Dashboard: Header Change
    --------------------------------------------------------
  */

  var newDashboardHeader = '<h1 class="dashboardNewHeader">Welcome to the Rosebank Exchange</h1><h2 class="dashboardNewSubtitle">Rosebank College\'s Learning Management System</h2>';
  $('.ic-Dashboard-header .grid-row .col-xs-9')
    .hide()
    .html(newDashboardHeader)
    .fadeIn(100);

  /*
    Footer Removal
    ------------------
  */
  $('footer').remove();
});
