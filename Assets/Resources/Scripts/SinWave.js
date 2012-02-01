public var frequency : float = 1;
public var amplitude : float = 10;

function Start() {
	
}

function Update() { 
	transform.position.y = Mathf.Sin( Time.time * frequency ) * amplitude;
	
//	Debug.Log("Time? " + Time.time);
}