import React, { Component } from "react";
import Logo from "./images/onlinecoursesgreen.jpeg";
import siteintro from "./images/onlinelearning4.jpeg";
import learnmathsone from "./images/onlinelearningmaths2.jpeg";
import learnhtmlsone from "./images/learnhtml1.jpeg";
import learnphysicsone from "./images/learnphysics1.jpg";
import learnchemistryone from "./images/learnchemistry1.jpg";
import learnenglishone from "./images/learnenglish1.jpg";
import learnhindione from "./images/learnhindi1.jpg";
import learnteluguone from "./images/learntelugu1.png";
import learnsmartone from "./images/onlinelearningsmart1.jpeg";
import learnwhileworkone from "./images/learnanytime1.jpeg";
import bestteacherone from "./images/bestteacher2.jpeg";
import pricingone from "./images/pricing1.jpeg";

//import "./app.css";
import Templateone from "./templates/templateone";
import Templatetwo from "./templates/templatetwo";
//import localdbdata from "./db/localdbdata.json";
import Signincheck from "./components/auth/signincheck";
import {
  sortArray,
  fieldTypeHtmltoDBmapping,
  getLocalData,
  serverButtonHandler,
} from "./js/index";

class F extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { routerprops } = this.props;
    let localdata = getLocalData(this.props);

    console.log(this.props);
    //console.log(localdbdata.localdbdata.data);
    let siteprops = {};
    siteprops.sitetemplatename = "templatetwo";
    siteprops.sitelogourl = "";
    siteprops.siteheaderorgname = "PostPaidTutors";
    siteprops.siteorgdbname = "postpaidtutors";
    siteprops.siteportalurl = "";
    siteprops.sitelogouturl = "http://localhost:3000/";

    siteprops.siteintroposition = "";
    siteprops.siteintroimgsrc = siteintro;
    siteprops.siteintroheading =
      "Are you looking for best Online School tutors";
    siteprops.siteintrosubheading =
      "we will provide best tutoring services at affordable price";
    //siteprops.siteintroinputplaceholder = "What do you want to learn?";
    // siteprops.siteintrobuttonlabel = "Find information";
    siteprops.siteintroinputplaceholder = "";
    siteprops.siteintrobuttonlabel = "";

    siteprops.sitefooterlinks1 = {
      0: { label: "How it works", name: "pricing", link: "" },
      1: { label: "Question and Answers", name: "faqs", link: "" },
    };
    siteprops.sitefooterlinks2 = {
      0: { label: "Job Opportunities", name: "jobopportunities", link: "" },
      1: { label: "Pricing", name: "pricing", link: "" },
    };

    siteprops.siteorgphone = "+919133363934";
    siteprops.siteorgemail = "support@postpaidtutors.com";
    siteprops.siteorgaddress = "hyderabad India, 50000";
    siteprops.sitesociallinks = {
      // facebook: "facebook.com",
      // twitter: "twitter.com",
      whatsapp: "whatsapp.com",
    };

    let mathsfirsthtml1 = [];
    mathsfirsthtml1.push(
      <>
        <div>
          <span className="sf">Chapter 1 : </span>
          <span className="mf">Shapes and Space</span>
        </div>
        <div>
          <span className="sf">Chapter 2 : </span>
          <span className="mf">Numbers from 1 to 9</span>
        </div>
        <div>
          <span className="sf">Chapter 3 : </span>
          <span className="mf">Addition and Substraction</span>
        </div>
      </>
    );

    siteprops.siteheadernavmenuitems = {
      5: {
        label: "Enroll",
        name: "academicsubjects",
        action: {},
        isactive: "true",
        dropdownitems: {
          0: {
            label: "Maths",
            name: "maths",
            action: {},
            isactive: "true",
            dropdownitems: {
              0: {
                label: "First Grade",
                name: "first",
                action: {},
                isactive: "false",
              },
              1: {
                label: "Second Grade",
                name: "second",
                action: {},
                isactive: "false",
              },
              2: {
                label: "Third Grade",
                name: "third",
                action: {},
                isactive: "false",
              },
              3: {
                label: "Fourth Grade",
                name: "fourth",
                action: {},
                isactive: "false",
              },
              4: {
                label: "Fifth Grade",
                name: "fifth",
                action: {},
                isactive: "false",
              },
              5: {
                label: "Sixth Grade",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh Grade",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth Grade",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth Grade",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth Grade",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
          1: {
            label: "Physics",
            name: "physics",
            action: {},
            isactive: "false",
            dropdownitems: {
              0: {
                label: "First Grade",
                name: "first",
                action: {},
                isactive: "true",
              },
              1: {
                label: "Second Grade",
                name: "second",
                action: {},
                isactive: "true",
              },
              2: {
                label: "Third Grade",
                name: "third",
                action: {},
                isactive: "true",
              },
              3: {
                label: "Fourth Grade",
                name: "fourth",
                action: {},
                isactive: "true",
              },
              4: {
                label: "Fifth Grade",
                name: "fifth",
                action: {},
                isactive: "true",
              },
              5: {
                label: "Sixth Grade",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh Grade",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth Grade",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth Grade",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth Grade",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
          2: {
            label: "Chemistry",
            name: "chemistry",
            action: {},
            isactive: "false",
            dropdownitems: {
              0: {
                label: "First Grade",
                name: "first",
                action: {},
                isactive: "true",
              },
              1: {
                label: "Second Grade",
                name: "second",
                action: {},
                isactive: "true",
              },
              2: {
                label: "Third Grade",
                name: "third",
                action: {},
                isactive: "true",
              },
              3: {
                label: "Fourth Grade",
                name: "fourth",
                action: {},
                isactive: "true",
              },
              4: {
                label: "Fifth Grade",
                name: "fifth",
                action: {},
                isactive: "true",
              },
              5: {
                label: "Sixth Grade",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh Grade",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth Grade",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth Grade",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth Grade",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
          3: {
            label: "English",
            name: "english",
            action: {},
            isactive: "false",
            dropdownitems: {
              0: {
                label: "First Grade",
                name: "first",
                action: {},
                isactive: "true",
              },
              1: {
                label: "Second Grade",
                name: "second",
                action: {},
                isactive: "true",
              },
              2: {
                label: "Third Grade",
                name: "third",
                action: {},
                isactive: "true",
              },
              3: {
                label: "Fourth Grade",
                name: "fourth",
                action: {},
                isactive: "true",
              },
              4: {
                label: "Fifth Grade",
                name: "fifth",
                action: {},
                isactive: "true",
              },
              5: {
                label: "Sixth Grade",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh Grade",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth Grade",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth Grade",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth Grade",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
          4: {
            label: "Hindi",
            name: "hindi",
            action: {},
            isactive: "false",
            dropdownitems: {
              0: {
                label: "First",
                name: "first",
                action: {},
                isactive: "true",
              },
              1: {
                label: "Second",
                name: "second",
                action: {},
                isactive: "true",
              },
              2: {
                label: "Third",
                name: "third",
                action: {},
                isactive: "true",
              },
              3: {
                label: "Fourth",
                name: "fourth",
                action: {},
                isactive: "true",
              },
              4: {
                label: "Fifth",
                name: "fifth",
                action: {},
                isactive: "true",
              },
              5: {
                label: "Sixth",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
          5: {
            label: "Telugu",
            name: "telugu",
            action: {},
            isactive: "false",
            dropdownitems: {
              0: {
                label: "First",
                name: "first",
                action: {},
                isactive: "true",
              },
              1: {
                label: "Second",
                name: "second",
                action: {},
                isactive: "true",
              },
              2: {
                label: "Third",
                name: "third",
                action: {},
                isactive: "true",
              },
              3: {
                label: "Fourth",
                name: "fourth",
                action: {},
                isactive: "true",
              },
              4: {
                label: "Fifth",
                name: "fifth",
                action: {},
                isactive: "true",
              },
              5: {
                label: "Sixth",
                name: "sixth",
                action: {},
                isactive: "true",
              },
              6: {
                label: "Seventh",
                name: "seventh",
                action: {},
                isactive: "true",
              },
              7: {
                label: "Eighth",
                name: "eighth",
                action: {},
                isactive: "true",
              },
              8: {
                label: "Nineth",
                name: "nineth",
                action: {},
                isactive: "true",
              },
              9: {
                label: "Tenth",
                name: "tenth",
                action: {},
                isactive: "true",
              },
            },
          },
        },
      },
      1: {
        label: "Non Academic",
        name: "nonacademic",
        isactive: "false",
        action: {},
        dropdownitems: {
          2: {
            label: "Group Discussion",
            name: "groupdiscussion",
            dropdownitems: {},
            action: {},
            isactive: "true",
          },
          1: {
            label: "Interview Management",
            name: "interviewmanagement",
            action: {},
            isactive: "true",
            dropdownitems: {},
          },
          0: {
            label: "Spoken English",
            name: "spokenenglish",
            action: {},
            isactive: "true",
            dropdownitems: {},
          },
        },
      },
      0: {
        label: "Tech Skills",
        name: "techskills",
        isactive: "false",
        action: {},
        dropdownitems: {
          0: {
            label: "HTML",
            name: "html",
            dropdownitems: {},
            action: {},
            isactive: "true",
          },
          1: {
            label: "CSS",
            name: "css",
            action: {},
            isactive: "true",
            dropdownitems: {},
          },
          2: {
            label: "Java script",
            name: "javascript",
            action: {},
            isactive: "true",
            dropdownitems: {},
          },
          3: {
            label: "Salesforce",
            name: "salesforce",
            action: {},
            isactive: "true",
            dropdownitems: {},
          },
        },
      },

      3: {
        label: "Tutors",
        name: "tutors",
        isactive: "false",
        action: {},
        dropdownitems: {},
      },
      3: {
        label: "My Calender",
        name: "mycalender",
        isactive: "true",
        action: {},
        dropdownitems: {},
      },
      7: {
        label: "Pricing",
        name: "pricing",
        isactive: "false",
        action: {},
        dropdownitems: {},
      },
      2: {
        label: "My Courses",
        name: "mycourses",
        isactive: "true",
        action: {},
        dropdownitems: {},
      },
      6: {
        label: "Notepad",
        name: "notepad",
        isactive: "true",
        action: {},
        dropdownitems: {},
      },

      10: {
        label: "FAQS",
        name: "faqs",
        isactive: "false",
        action: {},
        dropdownitems: {},
      },

      8: {
        label: "Login / Register",
        name: "loginregister",
        isactive: "false",
        action: {},
        dropdownitems: {},
      },
      9: {
        label: "+919133363934",
        name: "callback",
        isactive: "true",
        action: {},
        dropdownitems: {},
      },
    };

    siteprops.sitebodyarray = {
      home: {
        maintab: "",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnsmartone,
            heading: "Smart way of Learning",
            body:
              "If you are looking for best way to learn, you have come at right place. Use our high standard techlogy tools which are designed to  help focus more on learning. Users will be provided Login credentials. Each user can login and start using the resources. you may have started learning many things at a time. This will not be easy with out a proper document management. We provide best tools where you can draft your work and save your work and can start again from next login. Each and every course you learn will have seperate learning path which will help learning many thing at same time",
          },
          1: {
            isactive: "true",
            type: "imgcenter",
            imgurl: learnwhileworkone,
            heading: "Any time learning",
            body:
              "Are you working anywhere ? Is your work stopping you from learning the subjects you are more interested in. Do not worry. We also provide the classes in off working hours  which are suitable for all people who want work and learn ",
          },
          2: {
            isactive: "true",
            type: "imgleft",
            imgurl: bestteacherone,
            heading: "Best Tutors",
            body:
              "Learning path will be fast and effective with best tutors. Within each and every course, leaners are given a chance to review thier course and tutor. you can find reviews and decide before joing course. We are 100% transparent in serving the interest of learners. At any time you are feel free to reach us on phone or email and provide your valueable feedback. Our teachers are very dedicative in teaching the best and very punctual about attending the classes",
          },

          3: {
            isactive: "false",
            type: "threecolumn",
            body: {
              0: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
              1: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
              2: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
            },
          },
          4: {
            isactive: "false",
            type: "getstartedbuttonpanel",

            heading: "Still have questions ? chat us or",
            buttonlabel: "Get Started",
            buttonurl: "",
          },
        },
      },
      techskillshtml: {
        maintab: "techskills",
        dropdown: "html",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnhtmlsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking for some students. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "first",
              // },
              parentid: "",
              iscreateactive: "",
              isviewactive: "",
            },
          },
          2: {
            isactive: "false",
            type: "imgleft",
            imgurl: Logo,
            heading: "Best Tutors",
            body:
              "Learning path will be fast and effective with best tutors. Within each and every course, leaners are given a chance to review thier course and tutor. you can find reviews and decide before joing course. We are 100% transparent in serving the interest of learners. At any time you are feel free to reach us on phone or email and provide your valueable feedback. Our teachers are very dedicative in teaching the best and very punctual about attending the classes",
          },

          3: {
            isactive: "false",
            type: "threecolumn",
            body: {
              0: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
              1: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
              2: {
                type: "threecolumn",
                imgurl: Logo,
                heading: "Tutoring Services in Park Cities",
                body:
                  " Are you struggling to keep up with your coursework? Do you want to get a head start on the next school year? At Tutor Doctor Park Cities, we know how important your education is and our tutors can provide you with the skills you need to reach your academic goals. With our In-home and online tutoring, you can benefit from learning in an environment you are comfortable in, at times that fit best with your schedule. Making a difference in the life of students is at the heart of what we do. Contact us today and discover why so many people trust us with all of their tutoring needs.",
              },
            },
          },
          4: {
            isactive: "false",
            type: "getstartedbuttonpanel",

            heading: "Still have questions ? chat us or",
            buttonlabel: "Get Started",
            buttonurl: "",
          },
        },
      },
      mycalender: {
        maintab: "mycalender",
        dropdown: "",
        rightdropdown: "",
        data: {
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {},
              parentid: localdata.userid,
              iscreateactive: "false",
              isviewactive: "true",
              showallrecordsubscribe: "true",
              viewlayoutid: "event-view2",
              editlayoutid: "event-edit",
              newlayoutid: "event-new",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "first",
              // },
            },
          },
        },
      },

      academicsubjectsmathssixth: {
        maintab: "academicsubjects",
        dropdown: "maths",
        rightdropdown: "sixth",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnmathsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking and confusing for some students. The concepts and basic logic understanding is really matters. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "sixth",
              // },
              enablelocaldbdata: "false",
              defaultsortparam: "evt",
              hidedisplaytypepanel: "true",
              hidesidebar: "true",
              iscreateactive: "false",
              isviewactive: "false",
              tablename: "event",
              parentid: localdata.userid,
            },
          },
          2: {
            isactive: "true",
            type: "getstartedbuttonpanel",

            heading: "",
            buttonlabel: "Click to Join the Course",
            buttonurl: "/createrecord?tablename=coursesubscribe&recordid=",
          },
        },
      },
      academicsubjectsmathsseventh: {
        maintab: "academicsubjects",
        dropdown: "maths",
        rightdropdown: "seventh",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnmathsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking and confusing for some students. The concepts and basic logic understanding is really matters. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              datadisplaytype: "",
              viewname: "",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "seventh",
              // },
            },
          },
        },
      },
      academicsubjectsmathseighth: {
        maintab: "academicsubjects",
        dropdown: "maths",
        rightdropdown: "eighth",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnmathsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking and confusing for some students. The concepts and basic logic understanding is really matters. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              datadisplaytype: "",
              viewname: "",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "eighth",
              // },
            },
          },
        },
      },
      academicsubjectsmathsnineth: {
        maintab: "academicsubjects",
        dropdown: "maths",
        rightdropdown: "nineth",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnmathsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking and confusing for some students. The concepts and basic logic understanding is really matters. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              datadisplaytype: "",
              viewname: "",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "nineth",
              // },
            },
          },
        },
      },
      academicsubjectsmathstenth: {
        maintab: "academicsubjects",
        dropdown: "maths",
        rightdropdown: "tenth",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: learnmathsone,
            heading: "Make it Interesting",
            body:
              "Maths learning is easy for some students and very time taking and confusing for some students. The concepts and basic logic understanding is really matters. We have very experienced teachers who have been in the teaching fields since many years helping many students learn critical problem solving skills. Our teachers believe in teaching from basic and fundamental concepts. This helps all students developes required problem solving skills irrespective of level of their level of knowledge ",
          },
          1: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              datadisplaytype: "",
              viewname: "",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: {
              //   subject: "maths",
              //   class: "tenth",
              // },
            },
          },
        },
      },

      calender: {
        maintab: "calender",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "calender",
            imgurl: "",
            heading: "Training calender",
            body: "",
            compprops: {
              tablename: "event",
              datadisplaytype: "",
              viewname: "",
              defaultsortparam: "evt",
              hidesidebar: "true",
              hidedisplaytypepanel: "true",
              enablelocaldbdata: "false",
              // defaultdatafilter: { subject: "maths", class: "first" },
            },
          },
        },
      },
      pricing: {
        maintab: "pricing",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "imgright",
            imgurl: pricingone,
            heading: "One Month Free Trial",
            body:
              "Currently we are providing one month free trail on all the courses. Please have a look at the calender to get more information on the course schedule. Our courses are being provided a affordable prices, please contact us to get more informations by entering details below form",
          },
          1: {
            isactive: "true",
            type: "contactus",
            imgurl: "",
            heading: "Pricing Information",
            body: "",
            compprops: {
              templatebody:
                "Hi,%0A%0AMy name is templatefromnametext,%0A%0AI am looking to get more information on templatecoursetext,%0A%0AContact Email%3A templatefromemailtext,%0AContact No%3A is templatefromphonenotext,%0A%0AThank you,%0A%0ARegards,%0Atemplatefromnametext",
              templatesubject: "Enquiry about course templatecoursetext",
              toemail: "support@postpaidtutors.com",
            },
          },
        },
      },

      mycourses: {
        maintab: "mycourses",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "recordlist",
            imgurl: "",
            heading: "My Courses",
            body: "",

            compprops: {
              listdisplaytype: "table",
              tablename: "recordsubscribe",
              viewname: "recordsubscribe-rv",
              defaulttableviewnamebeginswith: "recordsubscribe-",
              recordviewfieldname: "id",
              showrecordeditview: "true",
              recordeditviewprops: {
                editlayoutid: "recordsubscribe-edit",
                idbeginswith: "rs",
                newlayoutid: "recordsubscribe-new",
                tablename: "recordsubscribe",
                viewlayoutid: "recordsubscribe-view",
              },
            },
          },
        },
      },
      notepad: {
        maintab: "notepad",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "notepad",
            imgurl: "",
            heading: "Notepad",
            body: "",
            compprops: {
              tablename: "note",
              defaultsortparam: "nt",
              enablelocaldbdata: "false",
              parentid: localdata.userid,
              // defaultdatafilter: {},
              iscreateactive: "true",
              isviewactive: "true",
              iseditactive: "true",
              isdeleteactive: "true",
              showallrecordsubscribe: "true",
            },
          },
        },
      },

      jobopportunities: {
        maintab: "jobopportunities",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "contactus",
            imgurl: "",
            heading: "Job Opportunities",
            body: "",
            compprops: {
              templatebody:
                "Hi,%0A%0AMy name is templatefromnametext,%0A%0AI am looking to get more information on jobs for templatecoursetext,%0A%0AContact Email%3A templatefromemailtext,%0AContact No%3A is templatefromphonenotext,%0A%0AThank you,%0A%0ARegards,%0Atemplatefromnametext",
              templatesubject:
                "Enquiry about Job opportunities for course templatecoursetext",
              toemail: "support@postpaidtutors.com",
            },
          },
        },
      },
      faqs: {
        maintab: "faqs",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "faqs",
            imgurl: "",
            heading: "Frequently Asked Questions",
            body: "",
            compprops: {
              qas: {
                0: {
                  question:
                    "I am looking for a course which is not there on the website, Is there any chance to get classes ? ",
                  answer:
                    "If you are looking for a particular course which is not there on website , reach us on email / phone, we will check and let you know back on the availability",
                },
                1: {
                  question:
                    "I have joined the Course recently, but I am not fully satisfied with the course and I may not wish to continue the course, would I get any refund ? ",
                  answer:
                    "During the initial trial period we would not be charging any money. so it is student responsibility to pay attention to the class and find out if the tutor is meeting his expectations or not ",
                },
                3: {
                  question: "Is there any contract period on courses ?",
                  answer:
                    "Currently there is no contract time duration. For more information you can navigate to Pricing information section",
                },
              },
            },
          },
        },
      },
      callback: {
        maintab: "callback",
        dropdown: "",
        rightdropdown: "",
        data: {
          0: {
            isactive: "true",
            type: "contactus",
            imgurl: "",
            heading: "Request a Call back",
            body: "",
            compprops: {
              templatebody:
                "Hi,%0A%0AMy name is templatefromnametext,%0A%0AI am looking to get more information  for templatecoursetext,%0A%0AContact Email%3A templatefromemailtext,%0AContact No%3A is templatefromphonenotext,%0A%0AThank you,%0A%0ARegards,%0Atemplatefromnametext",
              templatesubject: "Enquiry about course templatecoursetext",
              toemail: "support@postpaidtutors.com",
            },
          },
        },
      },
    };

    if (localdata.userprofileid === "admin") {
      siteprops.siteheadernavmenuitems = {
        3: {
          label: "My Calender",
          name: "mycalender",
          isactive: "true",
          action: {},
          dropdownitems: {},
        },

        2: {
          label: "My Courses",
          name: "mycourses",
          isactive: "true",
          action: {},
          dropdownitems: {},
        },
        6: {
          label: "Notepad",
          name: "notepad",
          isactive: "true",
          action: {},
          dropdownitems: {},
        },

        9: {
          label: "+919133363934",
          name: "callback",
          isactive: "true",
          action: {},
          dropdownitems: {},
        },
      };

      siteprops.sitebodyarray = {
        home: {
          maintab: "",
          dropdown: "",
          rightdropdown: "",
          data: {
            0: {
              isactive: "true",
              type: "imgright",
              imgurl: learnsmartone,
              heading: "Smart way of Learning",
              body:
                "If you are looking for best way to learn, you have come at right place. Use our high standard techlogy tools which are designed to  help focus more on learning. Users will be provided Login credentials. Each user can login and start using the resources. you may have started learning many things at a time. This will not be easy with out a proper document management. We provide best tools where you can draft your work and save your work and can start again from next login. Each and every course you learn will have seperate learning path which will help learning many thing at same time",
            },
          },
        },

        mycalender: {
          maintab: "mycalender",
          dropdown: "",
          rightdropdown: "",
          data: {
            1: {
              isactive: "true",
              type: "calender",
              imgurl: "",
              heading: "Training calender",
              body: "",
              compprops: {
                tablename: "event",
                defaultsortparam: "evt",
                hidesidebar: "true",
                hidedisplaytypepanel: "true",
                enablelocaldbdata: "false",
                // defaultdatafilter: {},
                parentid: localdata.userid,
                iscreateactive: "true",
                isviewactive: "true",
                showallrecordsubscribe: "false",
                viewlayoutid: "event-view",
                editlayoutid: "event-edit",
                newlayoutid: "event-new",
              },
            },
          },
        },

        mycourses: {
          maintab: "mycourses",
          dropdown: "",
          rightdropdown: "",
          data: {
            0: {
              isactive: "true",
              type: "recordlist",
              imgurl: "",
              heading: "Courses",
              body: "",
              compprops: {
                listdisplaytype: "table",
                tablename: "lesson",
                viewname: "lesson-rv",
                defaulttableviewnamebeginswith: "lesson-",
                showrecordeditview: "true",
                recordviewfieldname: "id",
                recordeditviewprops: {
                  editlayoutid: "lesson-edit2",
                  idbeginswith: "ls",
                  newlayoutid: "lesson-new1",
                  tablename: "lesson",
                  viewlayoutid: "lesson-view2",
                },
              },
            },
          },
        },

        notepad: {
          maintab: "notepad",
          dropdown: "",
          rightdropdown: "",
          data: {
            0: {
              isactive: "true",
              type: "notepad",
              imgurl: "",
              heading: "Notepad",
              body: "",
              compprops: {
                tablename: "note",
                defaultsortparam: "nt",
                enablelocaldbdata: "false",
                parentid: localdata.userid,
                // defaultdatafilter: {},
                iscreateactive: "true",
                isviewactive: "true",
                iseditactive: "true",
                isdeleteactive: "true",
                showallrecordsubscribe: "true",
              },
            },
          },
        },

        callback: {
          maintab: "callback",
          dropdown: "",
          rightdropdown: "",
          data: {
            0: {
              isactive: "true",
              type: "contactus",
              imgurl: "",
              heading: "Request a Call back",
              body: "",
              compprops: {
                templatebody:
                  "Hi,%0A%0AMy name is templatefromnametext,%0A%0AI am looking to get more information  for templatecoursetext,%0A%0AContact Email%3A templatefromemailtext,%0AContact No%3A is templatefromphonenotext,%0A%0AThank you,%0A%0ARegards,%0Atemplatefromnametext",
                templatesubject: "Enquiry about course templatecoursetext",
                toemail: "support@postpaidtutors.com",
              },
            },
          },
        },
      };
    }

    console.log(routerprops);
    return (
      <>
        {siteprops.sitetemplatename === "templatetwo" ? (
          <Templatetwo siteprops={siteprops} routerprops={routerprops} />
        ) : (
          ""
        )}
        {siteprops.sitetemplatename === "templateone" ? (
          <Templateone siteprops={siteprops} routerprops={routerprops} />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Signincheck(F);
