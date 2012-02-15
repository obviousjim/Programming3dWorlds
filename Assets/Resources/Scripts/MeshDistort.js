public var inflateSpeed : float;

function Update () {
	var mesh : Mesh = GetComponent(MeshFilter).mesh;
	var vertices : Vector3[] = mesh.vertices;
	var normals : Vector3[] = mesh.normals;
	var center : Vector3 = transform.position;

	for(var i = 0; i < vertices.Length; i++){
		//debug draw ray params start point, direction, color
		Debug.DrawRay(center+vertices[i], normals[i]*0.05, Color.blue);
		vertices[i] += normals[i]*inflateSpeed;
	}
	mesh.vertices = vertices;

}