function Lights( scene ) {
	
	const ambientLightColor = new THREE.Color( "rgb(255, 255, 255)" );
	const ambientLight = new THREE.AmbientLight( ambientLightColor, 0.5 );
	  ambientLight.name = "ambientLight";
      ambientLight.position.set( 15, 3000, 40 );

      scene.add(ambientLight);
	
	const spotLightColor = new THREE.Color( "rgb(255, 255, 255)" );
    const spotLight = new THREE.PointLight( spotLightColor, 0.525 );
      spotLight.name = "spotLight";
      spotLight.position.set( -300, 1500, -1570 );

    scene.add( spotLight );

	this.update = function(time) {
		spotLight.intensity = (Math.sin(time)+1.5)/1.5;
		spotLight.color.setHSL( Math.sin(time), 0.5, 0.5 );
	}
}