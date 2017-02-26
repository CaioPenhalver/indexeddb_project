window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
   
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Não hà suporte para essa aplicação!")
}


var db;
var studentData = {
  name: '',
  email: '',
  course: ''
}

var add = function(student){
          var request = db.transaction(['students'], 'readwrite')
          .objectStore('students')
          .add(student);
          
          request.onsuccess = function(event) {
             console.log("${studentData} foi adicionado!");
          };
          
          request.onerror = function(event) {
            console.log('Ocorreu um erro');
          }
}


var startDB = function() {
        var request = window.indexedDB.open("students", 1);

         request.onerror = function(event) {
            console.log('error: ' + event);
         };

         request.onsuccess = function(event) {
            db = request.result;
            console.log('success: ' + db);
         };

         request.onupgradeneeded = function(event) {
            console.log('ok');
            var db = event.target.result;
            var objectStore = db.createObjectStore('students', {keyPath: "email"});
            studentData = {
                            name: 'caio',
                            email: 'caio@gmail.com',
                            course: 'cuso-1'
                          }
           objectStore.add(studentData)
           objectStore.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;
                 
              if (cursor) {
                console.log(cursor);
                cursor.continue();
              } else {
                    alert("No more entries!");
              }
              };
         };
}

var listStudents = function() {
            console.log('database -->>>> '+db);
            var objectStore = db.transaction(['students'])
                                .objectStore('students');
            objectStore.openCursor().onsuccess = function(event) {
              var cursor = event.target.result;
                 
              if (cursor) {
                var courseName;
                cursos.forEach(function(curso, index) {
                  if(cursor.value.course === curso.id){
                    courseName = curso.titulo;
                    return;
                  }
                });
                $('#flex-container').append("<div class=\"flex-item\">"+
                                           "<h3>"+cursor.value.name+"</h3>" +
                                            "<p>"+cursor.key+"</p>" +
                                            "<p>"+courseName+"</p>" +
                                            "</div>");
                console.log(cursor);
                cursor.continue();
              } else {
                    console.log("Dados listados");
              }
            }; 
}
        
startDB();

