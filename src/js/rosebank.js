// Grab the course ID portion of the current URL
var path = window.location.pathname.split('/');

// Rosebank Calendar HTML
var calendar = '<h4 class="rosebank-calendar">Rosebank Calendar</h4><div id="rbc-calendar"><iframe src="https://www.google.com/calendar/hosted/rosebank.nsw.edu.au/embed?showTitle=0&amp;showTz=0&amp;mode=AGENDA&amp;height=400&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=rosebank.nsw.edu.au_7mc9b1ovepoeii25mh3pu3o8l8%40group.calendar.google.com&amp;color=%23528800&amp;src=rosebank.nsw.edu.au_cmf27oe74ggbe5fbdg8tf1a2l8%40group.calendar.google.com&amp;color=%232952A3&amp;src=rosebank.nsw.edu.au_b5ovt22501ffgv3igt9fltlik8%40group.calendar.google.com&amp;color=%23A32929&amp;src=rosebank.nsw.edu.au_5v3pg9qftun8shnl0h4iks94sg%40group.calendar.google.com&amp;color=%23BE6D00&amp;src=rosebank.nsw.edu.au_m4liq2rg04r8j5oq2b1uogdod8%40group.calendar.google.com&amp;color=%235229A3&amp;src=rosebank.nsw.edu.au_9viv52i6ti61f8op1ue98il0no%40group.calendar.google.com&amp;color=%23B1365F&amp;src=rosebank.nsw.edu.au_dm7hnfds2v5s7vnn6ahmuuh3bg%40group.calendar.google.com&amp;color=%23333333&amp;src=rosebank.nsw.edu.au_cc90g5ecu04nj2195ua0hemqok%40group.calendar.google.com&amp;color=%231B887A&amp;ctz=Australia%2FSydney" style="border-width:0;" width="100%" height="300" frameborder="0" scrolling="no"></iframe></div>';

// 'Learning Resources' Navigation Bar Element
var learningResources = '<a id="global_nav_learning-resources_link" href="/courses/187" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg ic-icon-svg--learning-resources" version="1.1" x="0px" y="0px" viewBox="0 0 26.748 28" enable-background="new 0 0 26.748 28" xml:space="preserve"><g><path fill="#FFFFFF" d="M14.257,9.055H3.225c-0.466,0-0.844-0.378-0.844-0.844c0-0.466,0.378-0.844,0.844-0.844h11.031,c0.466,0,0.844,0.378,0.844,0.844C15.101,8.677,14.723,9.055,14.257,9.055z"/></g><g><path fill="#FFFFFF" d="M14.257,12.134H3.225c-0.466,0-0.844-0.378-0.844-0.844s0.378-0.844,0.844-0.844h11.031,c0.466,0,0.844,0.378,0.844,0.844S14.723,12.134,14.257,12.134z"/></g><g><path fill="#FFFFFF" d="M14.257,15.212H3.225c-0.466,0-0.844-0.378-0.844-0.844s0.378-0.844,0.844-0.844h11.031,c0.466,0,0.844,0.378,0.844,0.844S14.723,15.212,14.257,15.212z"/></g><path fill="#FFFFFF" d="M14.729,19.37L13.466 18.148 12.769 20.065z"></path><g><path fill="#FFFFFF" d="M23.074,12.215V26.03c0,0.153-0.129,0.281-0.281,0.281H9.25c-0.153,0-0.281-0.129-0.281-0.281v-2.551h6.544,c1.086,0,1.97-0.884,1.97-1.97v-3.8l-1.689,1.659v2.14c0,0.153-0.129,0.281-0.281,0.281H1.97c-0.153,0-0.281-0.129-0.281-0.281,V6.851h3.888c1.031,0,1.871-0.839,1.871-1.871V1.615h8.065c0.153,0,0.281,0.129,0.281,0.281v12.974l1.689-1.659V6.135h5.31,c0.153,0,0.281,0.129,0.281,0.281v1.299l1.656-1.627c-0.157-0.93-0.963-1.642-1.937-1.642h-5.31v-2.55,c0-0.911-0.625-1.672-1.466-1.897H6.292c-0.093,0.03-0.18,0.076-0.256,0.146L0.276,5.381C0.12,5.524,0.035,5.716,0.014,5.918,C0.009,5.919,0.005,5.92,0,5.921v15.588c0,1.086,0.884,1.97,1.97,1.97h5.31v2.551c0,1.086,0.884,1.97,1.97,1.97h13.543,c1.086,0,1.97-0.884,1.97-1.97V10.555L23.074,12.215z M5.759,2.679V4.98c0,0.098-0.084,0.182-0.182,0.182H3.028L5.759,2.679z"/></g><path fill="#FFFFFF" d="M25.25,6.366L14.215 17.211 15.712 18.66 26.748 7.816 z"></path><path fill="#FFFFFF" d="M15.344000000000001,24.875a0.677,0.677 0 1,0 1.354,0a0.677,0.677 0 1,0 -1.354,0"/></svg><span class="menu-item__badge" style="display: none">0</span></div><div class="menu-item__text">Learning Resources</div></a>';

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

  if (path[2] === '187') {
    $('#left-side').remove();
    $('a#global_nav_courses_link').parent().removeClass('ic-app-header__menu-list-item--active');
    setTimeout(function () {
      $('a#global_nav_learning-resources_link')
        .parent()
        .addClass('ic-app-header__menu-list-item--active');
    }, 250);
  }

  /*
    Footer Removal
    ------------------
  */
  $('footer').remove();

  /*
    *** LEGACY ***
    ||||||||||||||
    vvvvvvvvvvvvvv
  */

  // /*
  //  Top Navigation
  //  --------------
  // */
  // // Rename 'Marks' to 'Results & Feedback' or 'Parent Information' depending on user role
  // if ($.inArray('observer', roles) >= 0) {
  //   $('li#grades_menu_item a').attr('href', '/courses/413').text('Parent Information').hide().fadeIn(200);
  // } else {
  //   $('li#grades_menu_item a').text('Results & Feedback').hide().fadeIn(200);
  // }
  //

  //
  // // Add 'Learning Resources' link
  // $('<li id="extra_menu_item" class="menu-item"><a href="/courses/187" class="menu-item-no-drop">Learning Resources</a></li>')
  //   .hide()
  //   .appendTo('ul#menu')
  //   .fadeIn(200);

  // /*
  //   Language Changes
  //   ----------------
  // */
  //
  // /*
  //   Side Navigation
  //   ---------------
  // */
  // $('li a.syllabus').text('Course Description');
  // $('li a.assignments').text('Tasks');
  // $('li a.grades').text('Results & Feedback');

  // /*
  //   [1] 'Marks'/'Grades' becomes 'Results & Feedback'
  //   -------------------------------------------------
  // */
  // $('nav#breadcrumbs ul li a[href*="/grades"]').first().text('Results & Feedback');
  // $('table td.percent span').text('no results');
  // $('a.print-grades').text('Print results');
  //
  // if (path[3] === 'grades') {
  //   // H2
  //   var h2 = $('div#content[role="main"] h2').first().text().split(' ');
  //   $('div#content[role="main"] h2').text('Results ' + h2[1] + ' ' + h2[5] + ' ' + h2[6]);
  //
  //   // Page Title
  //   var pageTitle = $('title').first().text().split(' ');
  //   $('title').text('Results ' + pageTitle[1] + ' ' + pageTitle[2] + ' ' + pageTitle[3].slice(0, -1));
  // }
  //
  // if (path[3] === 'gradebook') {
  //   // Wait between 1 and 2 seconds for /gradebook DOM weirdness
  //   setTimeout(function() {
  //     $('#main h1').text('Results & Feedback: Individual View');
  //     $('#main em').text('Note: Results, feedback, and notes will be saved automatically after moving out of the field.');
  //     $('label[for="arrange_assignments"]').text('Sort tasks');
  //     $('label[for="assignment_select"]').text('Select a task');
  //     $('#main h4').text('Results & Feedback');
  //     $('p:contains("Select a student and an assignment to view and edit marks.")').text('Select a student and a task to view and edit results.');
  //     $('p:contains("Select an assignment to view additional information here.")').text('Select a task to view additional information here.');
  //     $('h2:contains("Assignment Information")').text('Task Information');
  //     $('button[type="submit"]:contains("Update Mark")').text('Update Result');
  //   }, getRandomInt(1000, 2000));
  // }

  // /*
  //   [2] 'Assignments' becomes 'Tasks'
  //   ---------------------------------
  // */
  // $('nav#breadcrumbs ul li span:contains("Assignments")').text('Tasks');
  //
  // if (path[3] === 'assignments') {
  //   // Wait between 1 and 2 seconds for /assignments DOM weirdness
  //   setTimeout(function() {
  //     $('input[placeholder="Search for Assignment"]').attr('placeholder', 'Search for Task').attr('aria-label', 'Search for Task');
  //     $('a#addGroup').attr('title', 'Add Task Group').attr('aria-label', 'Add Task Group');
  //     $('a.new_assignment').text('Task').attr('title', 'New Task').attr('aria-label', 'New Task');
  //     $('a#assignmentSettingsCog').attr('title', 'Task Settings').attr('aria-label', 'Task Settings');
  //     $('input[placeholder="Assignment Name"]').attr('placeholder', 'Task Name').attr('aria-label', 'Task Name');
  //     $('label[for="assignment_group_id"]').text('Task Group');
  //     $('label[for="assignment_grading_type"]').text('Display Result as');
  //     $('div.form-column-left:contains("Group Assignment")').text('Group Task');
  //     $('em:contains("visible to the section")').html('Note: This task is <strong>only</strong> visible to the section(s) specified below:');
  //   }, getRandomInt(1000, 2000));
  // }
  // /*
  //   [3] 'Syllabus' becomes 'Course Description'
  //   -------------------------------------------
  // */
  // $('nav#breadcrumbs ul li span:contains("Syllabus")').text('Course Description');
  //
  // if (path[4] === 'syllabus') {
  //   $('#main h1').text('Course Description');
  //   $('a.edit_syllabus_link').html('<i class="icon-edit"></i> Edit Course Description');
  //   $('label[for="course_syllabus_body"').hide();
  //   $('button:contains("Update Syllabus")').text('Update');
  // }
});
