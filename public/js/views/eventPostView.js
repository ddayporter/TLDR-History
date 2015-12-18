var EventPostView = function(eventpost){
  this.eventPost = eventpost;

  this.$el = $("<div class='eventPost well'></div>");
  this.render();

  $(".eventPosts").prepend(this.$el);
};

var createButton = $(".createEventPostButton");
createButton.one("click", function(){
  event.preventDefault();
  var data = {  title: $('.formNewEventPost input[name=title]').val(),
  date: $('.formNewEventPost input[name=date]').val(),
  photoUrl: $('.formNewEventPost input[name=photoUrl]').val(),
  wikiPage: $('.formNewEventPost input[name=wikiPage]').val()
};

$(".formNewEventPost").hide();
$(".createEventPost").show();
EventPost.create(data).then( function(response){
  var eventPost = new EventPost(response);
  var view = new EventPostView(eventPost);
});

$(".createEventPostButton").off();

});

EventPostView.new = function(){
  // upon clicking create new Event post button, the button dissapears
  $(".formNewEventPost").show();
  $(".createEventPost").hide();
  var cancelButton = $(".cancelCreateEventPost");


cancelButton.on("click", function(){
  event.preventDefault();
  $(".formNewEventPost").hide();
  $(".createEventPost").show();
  cancelButton.off();
});
};

EventPostView.prototype = {
  render: function(){
    var self = this;

    self.$el.html(self.eventPostTemplate(self.eventPost));

    var showButton = self.$el.find(".showTldrs");
    var editButton = self.$el.find(".editEventPost");
    var deleteButton = self.$el.find(".deleteEventPost");
    var createTldrButton = self.$el.find(".createNewTldr"+self.eventPost.id);

    var tldrsDiv   = self.$el.find("div.tldrs");

    tldrsDiv.hide(); // hide div until it's populated with tldrs

    showButton.on("click", function(){
      self.toggleTldrs(tldrsDiv);
    });

    editButton.on("click", function() {
      self.renderEditForm();
    });

    deleteButton.on("click", function() {
      self.eventPost.destroy().then(function() {
        self.$el.fadeOut();
      });
    });

    createTldrButton.on("click", function(){

      $(".formNewTldr"+self.eventPost.id).show();
      var cancelCreateTldr = self.$el.find(".cancelCreateTldr"+self.eventPost.id);
      var createnewTldrButton = self.$el.find(".createnewTldrButton"+self.eventPost.id);


      cancelCreateTldr.on("click", function(){
        event.preventDefault();
        $(".summaryInputTldr"+self.eventPost.id).val("");
        $(".relevanceInputTldr"+self.eventPost.id).val("");

        $(".formNewTldr"+self.eventPost.id).hide();
      });


      createnewTldrButton.on("click", function(){
        event.preventDefault();
        // creaet a new tldr, attatching it to the eventPost
        var data = {  summary: $(".summaryInputTldr"+self.eventPost.id).val(),
        relevance: $(".relevanceInputTldr"+self.eventPost.id).val()
      };
      var eventPostID = self.eventPost.id;
      Tldr.create(data, eventPostID).then(function(response){
        var tldr = new Tldr(response);
        var view = new TldrView(tldr);
        $(".tldrsEventPost"+eventPostID).prepend(view.render());
        var deleteButton = $(".deleteTldr"+ tldr.id);
        var tldrDiv = $(".tldrDiv" + tldr.id );
        deleteButton.on("click", function() {
          tldr.destroy().then(function() {
            tldrDiv.fadeOut();
          });
        });


      });
      $(".formNewTldr"+self.eventPost.id).hide();
      cancelCreateTldr.off();
      createnewTldrButton.off();



    });
  });
},
renderEditForm: function() {
  var self = this;
  self.$el.html(this.eventPostEditTemplate(this.eventPost));

  self.$el.find(".updateEventPost").on("click", function() {
    self.updateEventPost();
  });
},
toggleButton: function(tldrsDiv){
  if(tldrsDiv.is(":visible")){
    tldrsDiv.siblings("button.showTldrs").text("Hide Tlrds");
  } else {
    tldrsDiv.siblings("button.showTldrs").text("Show Tldrs");
  }
},
toggleTldrs: function(tldrsDiv){
  var self = this;
  // if not in DOM, populate
  if(tldrsDiv.children().length === 0){
    this.eventPost.fetchTldrs().then(function(tldrs){
      self.appendTldrs(tldrs, tldrsDiv);
    });
  }
  // toggle (note: tldrsDiv starts hidden)
  tldrsDiv.toggle();
  this.toggleButton(tldrsDiv);
},
appendTldrs: function(tldrs, tldrsDiv){
  tldrs.forEach(function(tldr){
    var self = this;
    var tldrView = new TldrView(tldr);
    tldrsDiv.append(tldrView.render());
    var deleteButton = $(".deleteTldr"+ tldr.id);
    var tldrDiv = $(".tldrDiv" + tldr.id );
    deleteButton.on("click", function() {
      tldr.destroy().then(function() {
        tldrDiv.fadeOut();
      });
    });
  });
},
updateEventPost: function() {
  var self = this;
  var id = self.eventPost.id;

  var data = {  title: $('.editForm'+id+' input[name=title]').val(),
  date: $('.editForm'+id+' input[name=date]').val(),
  photoUrl: $('.editForm'+id+' input[name=photoUrl]').val(),
  wikiPage: $('.editForm'+id+' input[name=wikiPage]').val()
};
self.eventPost.update(data).then(function() { self.render();});
},
eventPostTemplate: function(eventPost){
  var html = $("<div>");
  html.append("<h3>" + eventPost.title + "</h3>");
  html.append("<h4>" + eventPost.date + "</h4>");
  html.append("<img class='eventPost-photo' src='" + eventPost.photoUrl + "'> <br>");
  html.append("<a href='" + eventPost.wikiPage + "' target='_blank'>Click Here to view the wikipage for this event</a> <br>");
  html.append("<button class='showTldrs btn btn-success'>Show Tldrs</button>");
  html.append("<button class='createNewTldr"+ eventPost.id +" createNewTldr btn btn-info'>Add a New tldr</button>");
  html.append("<button class='editEventPost btn btn-primary'>Edit Event</button>");
  html.append("<button class='deleteEventPost btn btn-danger'>Delete Event</button>");
  html.append("<div class='well formNewTldr"+eventPost.id+" formNewTldr' style='display: none;'><form role='form'><div class='form-group'> Summary : <input name='summary' value='' class='form-control summaryInputTldr"+eventPost.id+"'> Relevance : <input name='relevance' value='' class='form-control relevanceInputTldr"+eventPost.id+"'><button class='createnewTldrButton createnewTldrButton"+eventPost.id+" btn btn-success'>New tldr</button><button class='cancelCreateTldr"+eventPost.id+" cancelCreateTldr btn btn-danger'>Cancel</button></div></form></div>");
  html.append("<div class='tldrs tldrsEventPost"+eventPost.id+"'></div>");
  return(html);
},
eventPostEditTemplate: function(eventPost) {
  var html = $("<div class='editForm"+eventPost.id+"'>");
  html.append("<input name='title' value='" + eventPost.title + "'>");
  html.append("<input name='date' value='" + eventPost.date + "'>");
  html.append("<img class='eventPost-photo-thumbnail' src='" + eventPost.photoUrl + "'>");
  html.append("<input name='photoUrl' value='" + eventPost.photoUrl + "'>");
  html.append("<input name='wikiPage' value='" + eventPost.wikiPage + "'>");
  html.append("<button class='updateEventPost'>Update Event</button>");
  return(html);
},
};
