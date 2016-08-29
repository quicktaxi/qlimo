/**
 * Driver model events
 */

'use strict';

import {EventEmitter} from 'events';
import Driver from './driver.model';
var DriverEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DriverEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Driver.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DriverEvents.emit(event + ':' + doc._id, doc);
    DriverEvents.emit(event, doc);
  }
}

export default DriverEvents;
