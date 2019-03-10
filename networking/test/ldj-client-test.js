
'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');
/**    
* Creating mocha test
* @param name Name of the context
* @param function It has the initializers for each test
*/
describe('LDJClient', () => {
  let stream = null;
  let client = null;
/**    
* Initialize the variables
* @param function new instance of each class
*/
  beforeEach(() => {
    stream = new EventEmitter();
    client = new LDJClient(stream);
  });
/**    
* Test 1
* @param {string} name Description of the test to run
* @param function Assert if the message is being received correctly in one single data event
*/
  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":"bar"}\n');
  });
/**    
* Test 2
* @param {string} name Description
* @param function Assert if the message is being received correctly in more than one data event
*/
  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar'));
    process.nextTick(() => stream.emit('data', '"}\n'));
  });
/**    
* Test 3
* @param {string} name Description
* @param function Assert if it throws an exception if the stream is null
*/
  it('should throw an exception when the constructor is null', done => {
    assert.throws(()=>{
        new LDJClient(null);
        });
    done();
  });

/**    
* Test 4
* @param {string} name Description
* @param function Assert if it throws an exception if anything else than JSON is received
*/
  it ('Should throw an exception when its not formatted to JSON', done =>{
    assert.throws(()=>{
      stream.emit('data', '{"foo"\n');
    })
    done();
  })
/**    
* Test 5
* @param {string} name Description
* @param function Assert if the message is received correctly when sending the last one without the endline
*/
  it ('should accept the last string of message without the endline boundary when closed', done=>{
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });
    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  })

});
