'use strict';

var bio = {
  name: 'Mohamed El Zarei',
  role: 'Full Stack Web Developer',
  contacts: {
    mobile: '(+20) 109-712-5263',
    email: 'mohamedelzarei@gmail.com',
    github: 'melzareix',
    twitter: 'melzarei',
    location: 'Cairo, Egypt'
  },
  welcomeMessage: 'Hello World',
  skills: ['Python', 'Java', 'C/C++', 'Objective-C', 'PHP', 'SQL', 'NoSQL'],
  biopic: 'http://i.imgur.com/WWqcoqX.jpg',
  display: function() {
    HTMLheaderName = HTMLheaderName.replace('%data%', this.name);
    HTMLheaderRole = HTMLheaderRole.replace('%data%', this.role);

    HTMLmobile = HTMLmobile.replace('%data%', this.contacts.mobile);
    HTMLemail = HTMLemail.replace('%data%', this.contacts.email);
    HTMLtwitter = HTMLtwitter.replace('%data%', this.contacts.twitter);
    HTMLgithub = HTMLgithub.replace('%data%', this.contacts.github);
    HTMLlocation = HTMLlocation.replace('%data%', this.contacts.location);

    $('#header').prepend(HTMLheaderRole);
    $('#header').prepend(HTMLheaderName);

    var contactInfo = [HTMLmobile, HTMLemail, HTMLtwitter,
      HTMLgithub, HTMLlocation];
    contactInfo.forEach(function(detail) {
      $('#topContacts').append(detail);
    });

    HTMLbioPic = HTMLbioPic.replace('%data%', this.biopic);
    HTMLwelcomeMsg = HTMLwelcomeMsg.replace('%data%', this.welcomeMessage);

    $('#header').append(HTMLbioPic);
    $('#header').append(HTMLwelcomeMsg);

    $('#header').append(HTMLskillsStart);
    this.skills.forEach(function(skill) {
      var mySkill = HTMLskills.replace('%data%', skill);
      $('#skills').append(mySkill);
    });
  }
};

var education = {
  schools: [
    {
      name: 'German university in Cairo',
      location: 'Cairo, Egypt',
      degree: 'BSc',
      majors: ['Computer Science', 'Computer Engineering'],
      dates: '2014 - 2019 (Expected)',
      url: 'http://guc.edu.eg/'
    }
  ],
  onlineCourses: [
    {
      title: 'Full Stack Foundations',
      school: 'Udacity',
      dates: 'Jan 2017',
      url: 'https://www.udacity.com/courses/full-stack-foundations--ud088'
    },
    {
      title: 'JavaScript Design Patterns',
      school: 'Udacity',
      dates: 'Jan 2017',
      url: 'https://www.udacity.com/courses/javascript-design-patterns--ud989/'
    },
    {
      title: 'Developing Scalable Apps in Python',
      school: 'Udacity',
      dates: 'Jan 2017',
      url: 'https://www.udacity.com/courses/' +
      'developing-scalable-apps-in-python--ud858/'
    }
  ],
  display: function() {
    this.schools.forEach(function(school) {
      var schoolName = HTMLschoolName.replace('%data%', school.name);
      var schoolDegree = HTMLschoolDegree.replace('%data%', school.degree);
      var schoolDates = HTMLschoolDates.replace('%data%', school.dates);

      $('#education').append(HTMLschoolStart);
      $('.education-entry:last').append(schoolName);
      $('.education-entry:last').append(schoolDegree);
      $('.education-entry:last').append(schoolDates);
      school.majors.forEach(function(major) {
        $('.education-entry:last').append(HTMLschoolMajor
            .replace('%data%', major));
      });
      $('.education-entry:last').append('<br />');
    });

    $('#education').append(HTMLonlineClasses);
    this.onlineCourses.forEach(function(course) {
      var courseName = HTMLonlineTitle.replace('%data%', course.title);
      var courseSchool = HTMLonlineSchool.replace('%data%', course.school);
      var courseDates = HTMLonlineDates.replace('%data%', course.dates);
      var courseURL = HTMLonlineURL.replace('%data%', course.url)
          .replace('%data%', course.url);

      $('#education').append(HTMLschoolStart);
      $('.education-entry:last').append(courseName);
      $('.education-entry:last').append(courseSchool);
      $('.education-entry:last').append(courseDates);
      $('.education-entry:last').append(courseURL);

    });
  }
};

var work = {
  jobs: [
    {
      employer: 'Bdaya NGO',
      title: 'Web & Mobile Developer',
      location: 'Cairo, Egypt',
      dates: 'Nov 2015 - Present',
      description: 'Developing software for non-profit organizations to' +
      ' help them reach a wider audience.'
    },
    {
      employer: 'Digital Creativity Company',
      title: 'iOS Developer',
      location: 'Cairo, Egypt',
      dates: 'Aug. 2012 - Feb. 2013',
      description: 'Designed and developed feature rich iOS' +
      ' Applications using Xcode and Objective-C.'
    }
  ],
  display: function() {
    this.jobs.forEach(function(job) {

      var jobEmployer = HTMLworkEmployer.replace('%data%', job.employer);
      var jobTitle = HTMLworkTitle.replace('%data%', job.title);
      var jobDate = HTMLworkDates.replace('%data%', job.dates);
      var jobLocation = HTMLworkLocation.replace('%data%', job.location);
      var jobDescription = HTMLworkDescription.replace('%data%',
          job.description);

      $('#workExperience').append(HTMLworkStart);
      $('.work-entry:last').append(jobEmployer);
      $('.work-entry:last').append(jobTitle);
      $('.work-entry:last').append(jobDate);
      $('.work-entry:last').append(jobLocation);
      $('.work-entry:last').append(jobDescription);
      $('.work-entry:last').append('<br />');
    });
  }
};

var projects = {
  projects: [
    {
      title: 'Classic Arcade Game',
      dates: 'Feb 2017',
      description: 'Clone of the classic game, Frogger.',
      images: ['http://i.imgur.com/zywzxRo.jpg'],
    },
    {
      title: 'Neighborhood Map',
      dates: 'Jan 2017',
      description: 'User can view the most popular areas in Dubai and' +
      ' get information about them (Foursquare API).',
      images: ['http://i.imgur.com/L2ycTe3.jpg'],
    }
  ],
  display: function() {
    this.projects.forEach(function(project) {
      var projectTitle = HTMLworkTitle.replace('%data%', project.title);
      var projectDates = HTMLprojectDates.replace('%data%', project.dates);
      var projectDescription = HTMLprojectDescription.replace('%data%',
          project.description);

      $('#projects').append(HTMLprojectStart);
      $('.project-entry:last').append(projectTitle);
      $('.project-entry:last').append(projectDates);
      $('.project-entry:last').append(projectDescription);
      project.images.forEach(function(image) {
        $('.project-entry:last').append(HTMLprojectImage
            .replace('%data%', image));
      });
    });
  }
};

function initMap() {
  $('#mapDiv').append(googleMap);
}

bio.display();
work.display();
projects.display();
education.display();
$('#mapDiv').append(googleMap);
