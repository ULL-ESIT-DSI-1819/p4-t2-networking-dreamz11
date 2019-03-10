
'use strict';

const EventEmitter = require('events').EventEmitter;

/**    
* In this class we are extending the EventEmitter class in order to do specific tasks 
* @extends EventEmitter
*/
class LDJClient extends EventEmitter {
  /**    
* Constructor of the class. It splits the messages with the endline boundary
* @param {stream} stream of the connection from which events come
*/
  constructor(stream) {
    if(stream === null){
      throw new Error('null stream');
    }
    super();
    let buffer = '';
    stream.on('data', data => {
      buffer += data;
      let boundary = buffer.indexOf('\n');
      while (boundary !== -1) {
        const input = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);
        try{
          this.emit('message', JSON.parse(input));
        }catch(e){
          throw new Error('not a JSON');
        }
        boundary = buffer.indexOf('\n');
      }
    });
    /**    
* Action to do in the close event
* @param {event} close Event to act in
* @param function it emits the last message In LDJ from the event without an endline at the end
*/
    stream.on('close', data => {
      let boundary = buffer.indexOf('}');
      if (boundary !== -1) {
        const input = buffer.substring(0, boundary+1);
        try{
          this.emit('message', JSON.parse(input));
        }catch(e){
          throw new Error('not a Json');
        }
      }
      this.emit('close');
  });
  }


/**    
* Allows to use connect in the LDJ class directly
* @param {stream} stream used to act in the events
*/
  static connect(stream) {
    return new LDJClient(stream);
  }
}


module.exports = LDJClient;
