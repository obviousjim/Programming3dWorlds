#pragma strict

public class AnimatedLight {
	var light : GameObject;
	var speed : float;
	var axis : Vector3;
//	var distance : float;
	var target : Transform;
}

//these are set in the interface
public var initialLights : GameObject[];
public var targets : Transform[];

//we create this using our randoms
private var lights : AnimatedLight[];

function Start () {
	//create a light for each
	lights = new AnimatedLight[initialLights.Length];
	for(var i = 0; i < initialLights.Length; i++){
		var lightObject : AnimatedLight = new AnimatedLight();
		lightObject.light = initialLights[i];
		lightObject.speed = Random.Range(100, 300);
		lightObject.axis = Vector3.up;
		//lightObject.axis = Random.onUnitSphere;
		//lightObject.distance = Random.Range(100, 200);
		lightObject.target = targets[Random.Range(0,targets.Length)];
		
		lights[i] = lightObject;
	}
	
	
}

function Update () {
	for(var i = 0; i < lights.Length; i++){
		var lightObject :AnimatedLight = lights[i];
		lightObject.light.transform.RotateAround(lightObject.target.position, lightObject.axis, lightObject.speed*Time.deltaTime);
		lightObject.light.transform.LookAt(lightObject.target.position, lightObject.axis);
	}
}