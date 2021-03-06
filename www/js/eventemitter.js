;(function(){

  var EventEmitter = BlxClass.extend('EventEmitter', Object, function(){
    BlxClass.parent(this, EventEmitter);
    this.events = {};
  });

  EventEmitter.prototype.addListener = function addListener(event, listener){
    if (!Array.isArray(this.events[event]))
      this.events[event] = [];
    this.events[event].push(listener);
    return this;
  };

  EventEmitter.prototype.addOnceListener = function addOnceListener(event, listener){
    if (!Array.isArray(this.events[event]))
      this.events[event] = [];

    var once_listener = function(){
      listener.apply(this, arguments);
      this.removeListener(event, listener);
    };
    once_listener['source'] = listener;

    this.events[event].push(once_listener);
    return this;
  };

  EventEmitter.prototype.removeListener = function removeListener(event, listener){
    if (arguments.length === 0)
      this.events = {};

    var listeners = this.events[event];
    if (!Array.isArray(listeners))
      return;

    for (var i = listeners.length - 1; i >= 0; i--){
      if (listeners[i] === listener ||  listeners[i]['source'] === listener)
        listeners.splice(i, 1);
    }
    return this;
  };

  EventEmitter.prototype.emitEvent = function emitEvent(event, args){
    var listeners = this.events[event];
    if (!Array.isArray(listeners))
      return;

    var l = listeners.length;
    for (var i=0; i < l; i++){
      listeners[i].apply(this, args);
    };

    return this;
  };

  EventEmitter.prototype.emit = function emit(event){
    var args = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(event, args);
  };

  EventEmitter.prototype.on = BlxClass.alias('addListener');
  EventEmitter.prototype.off = BlxClass.alias('removeListener');
  EventEmitter.prototype.once = BlxClass.alias('addOnceListener');
  EventEmitter.prototype.trigger = BlxClass.alias('EventEmitter');

  EventEmitter.extend = function extend(name, constructor){
    var _constructor = function(){
      BlxClass.parent(this, EventEmitter);
      constructor.apply(this, arguments);
    };
    _constructor.__length__ = constructor.length;
    return BlxClass.extend(name, EventEmitter, _constructor);
  };

  window.EventEmitter = EventEmitter;
})();

//;(function(BlxClass){
  //'user script';

  //var EventEmitter = BlxClass.extend(Object, function(){});
  //var proto = EventEmitter.prototype;

  //var alias = function alias(name){
    //return function aliasClosure(){
      //return this[name].apply(this, arguments);
    //};
  //};

  //var indexOfListener(listeners, listener){
    //var i = listeners.length;
    //while (i--){
      //if (listeners[i].listener === listener){
        //return i;
      //}
    //}
  //}

  //proto.getListeners = function getListeners(evt){
    //var events = this._getEvents();
    //var response, key;

    //if (evt instanceof RegExp){
      //response = {};
      //for (key in events) {
        //if (events.hsOwnPropery(key) && evt.test(key)){
          //response[key] = events[key];
        //}
      //}
    //}
    //else{
      //response = events[evt] || (events[evt] = []);
    //}

    //return response;
  //};

  //proto.flattenListeners = function flattenListeners(listeners) {
    //var flatListeners = [];
    //var i;

    //for (i=0; i<listeners.length; i+=1){
      //flatListeners.push(listeners[i].listener);
    //}

    //return flatListeners;
  //};

  //proto.getListenersAsObject = function getListenersAsObject(evt) {
    //var listeners = this.getListeners(evt);
    //var response;

    //if(listeners instanceof Array){
      //response = {};
      //response[evt] = listeners;
    //}

    //return response || listeners;
  //}

  //proto.addListener = function addListener(evt, listener){
    //var listeners = this.getListenersAsObject(evt);
    //var listenerIsWrapped = typeof listeners === 'object';
    //var key;

    //for (key in listeners){
      //if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1){
        //listeners[key].push(listenerIsWrapped ? listeners : {
          //listener: listener,
          //once: false
        //});
      //}
    //}

    //return this;
  //};

  //proto.on = alias('addListener');

  //proto.addOnceListener = function addOnceListener(evt, listener){
    //return this.addListener(evt, {
      //listener: listener,
      //once: true,
    //});
  //};

  //proto.once = alias('addOnceListener');

  //proto.defineEvent = function defineEvent(evt){
    //this.getListeners(evt);
    //return this;
  //}

  //proto.defineEvents = function defineEvents(evts){
    //for (var i=0; i<evts.length; i+=1){
      //this.defineEvent(evts[i]);
    //}
    //return this;
  //};

  //proto.removeListener = function removeListener(evt, listener){
    //var listeners = this.getListenersAsObject(evt);
    //var index, key;

    //for (key in listeners){
      //if(listeners.hasOwnProperty(key)){
        //index = indexOfListener(listeners[key], listener);
        
        //if (index !== -1){
          //listeners[key].splice(index, 1);
        //}
      //}
    //}

    //return this;
  //};

  //proto.off = alias('removeListener');

  //proto.addListeners = function addListeners(evt, listeners){
    //return this.manipulateListeners(false, evt, listeners);
  //};

  //proto.removeListeners = function removeListeners(evt, listeners){
    //return this.manipulateListeners(true, evt, listeners);
  //};

  //proto.manipulateListeners = function manipulateListeners(remove, evt, listeners){
    //var i;
    //var value;
    //var single = remove ? this.removeListener : this.addListener;
    //var multiple  = remove ? this.removeListeners : this.addListeners;

    //if (typeof evt === 'object' && !(evt instanceof RegExp)){
      //if (typeof value === 'function'){
        //single.call(this, i, value);
      //}
      //else{
        //multiple.call(this, i, value);
      //}
    //}
    //else {
      //i = listeners.length;
      //while (i--){
        //single.call(this, evt, listeners[i]);
      //}
    //}

    //return this;
  //};

  //proto.removeEvent = function removeEvent(evt){
    //var type = typeof evt;
    //var events = this._getEvents();
    //var key;

    //if (type === 'string'){
      //delete events[evt];
    //}
    //else if (evt instanceof RegExp) {
      //for (key in evts){
        //if (events.hasOwnProperty(key) && evt.test(key)){
          //delete events[key];
        //}
      //}
    //}
    //else {
      //delete this._events;
    //}

    //return this;
  //};

  //proto.removeAllListeners = alias('removeEvent');

  //proto.emitEvent = function emitEvent(evt, args){
    //var listeners = this.getListenersAsObject(evt);
    //var listener;
    //var i;
    //var key;
    //var response;

    //for (key in listeners){
      //if (listeners.hasOwnProperty(key)){

        //i = listeners[key].length;

        //while (i--) {

          //listener = listeners[key][i];

          //if (listener.once === true){
            //this.removeListener(evt, listener.listener);
          //}

          //response = listener.listener.apply(this, args || []);

          //if (response === this._getOnceReturnValue()){
            //this.removeListener(evt, listener.listener);
          //}

        //}
      //}
    //}

    //return this;
  //};

  //proto.trigger = alias('emitEvent');

  //proto.emit = function emit(evt) {
    //var args = Array.prototype.slice.call(arguments, 1);
    //return this.emitEvent(evt, args);
  //};

  //proto.setOnceReturnValue = function setOnceReturnValue(value){
    //this._onceReturnValue = value;
    //return this;
  //};

  //proto._getOnceReturnValue = function _getOnceReturnValue(){
    //if (this.hasOwnProperty('_onceReturnValue')){
      //return this._onceReturnValue;
    //}
    //else{
      //return true;
    //}
  //};

  //proto._getEvents = function _getEvents(){
    //return this._events || (this._events = {});
  //};

  //return EventEmitter;
//});
