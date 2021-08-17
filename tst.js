const rclnodejs = require('rclnodejs');


rclnodejs.init().then(() => {
    
    const node = rclnodejs.createNode('subscription_example_node');
    
    node.createSubscription('sensor_msgs/msg/NavSatFix' , 'position', (msg) => {
    
        console.log(`Received message: ${typeof msg}`, msg);
    
    });
    
    rclnodejs.spin(node);
  });