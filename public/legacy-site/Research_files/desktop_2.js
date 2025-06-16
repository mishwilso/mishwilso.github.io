// For the moving dektop parts!!

system42("desktop", function (le) {
    "use strict"
    le._temp.defaultDesk = [
      {
        name: "WINDOWS 93.lnk42",
        exe: "/",
        row: 0,
        col: 0,
      },
      {
        name: "System (C:).lnk42",
        exe: "/c/",
        row: 1,
        col: 0,
      },
      {
        name: "Storage (A:).lnk42",
        exe: "/a/",
        row: 1,
        col: 1,
      },
      /*
      {
        name: "Board (B:).lnk42",
        exe: "b",
        row: 1,
        col: 2,
      },
      */
  
      {
        name: "Terminal.lnk42",
        exe: "hello",
        icon: "apps/terminal.png",
        row: 2,
        col: 0,
      },
  
      {
        name: "Cat Explorer.lnk42",
        exe: "catex",
        row: 2,
        col: 1,
      },
      /*
      {
        name: "Zkype.lnk42",
        exe: "zkype",
        row: 2,
        col: 2,
      },
      */
      {
        name: "Trollbox.lnk42",
        exe: "trollbox",
        icon: "apps/chat.gif",
        row: 2,
        col: 2,
      },
      {
        name: "93 Realms.lnk42",
        exe: "93realms",
        icon: "/c/files/images/icons/wizard.png",
        row: 2,
        col: 3,
      }      
    ]
  })
  