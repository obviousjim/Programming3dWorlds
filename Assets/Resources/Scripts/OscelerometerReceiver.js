public var min : float = 260;
public var max : float = 400;
public var smoothing : float;

public var someObject : Transform;

function Start () {

}

function Update () {

}

function OSCMessageReceived(message : OSC.NET.OSCMessage){
	Debug.Log("I got a message! " + message.Address);
	
	if(message.Address == "/read/accelerometer"){
		if(message.Values.Count == 4){
			Debug.Log("values are " + message.Values[0] + " " + message.Values[1] + " " + message.Values[2]);
			//do something interesting
			var targetPosition : Vector3 = Vector3( Map(message.Values[0], min, max, -10.0, 10.0, true),
								  					Map(message.Values[1], min, max, -10.0, 10.0, true),
							  						Map(message.Values[2], min, max, -10.0, 10.0, true));  
//			 transform.position = 
			//transform.position += (targetPosition - transform.position) * .01;
			transform.position = Vector3.Lerp(transform.position, targetPosition,  smoothing);

		}
		else{
			Debug.LogError("/read/accelerometer has the wrong number of args");
		}
	}
					
}



function Map(value : float, inputMin : float, inputMax : float, outputMin : float, outputMax : float , clamp : boolean) : float 
{
	if (Mathf.Abs(inputMin - inputMax) < Mathf.Epsilon){
		//Debug.Log("Map: avoiding possible divide by zero, check inputMin and inputMax");
		return outputMin;
	} else {
		var outVal = ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin);	
		if( clamp ){
			if(outputMax < outputMin){
				if( outVal < outputMax )outVal = outputMax;
				else if( outVal > outputMin )outVal = outputMin;
			}else{
				if( outVal > outputMax )outVal = outputMax;
				else if( outVal < outputMin )outVal = outputMin;
			}
		}
		return outVal;
	}
}
	