define(['vox/Shape/BaseShape'], function(BaseShape) {

	/**
	 * Constructs a Dome object
	 *
	 * @constructor
	 * @param {number} width         The width of the shape
	 * @param {number} depth         The depth of the shape
	 * @param {number} height         The height of the shape
	 * @param {number|null} thickness The thickness of the shape, or undefined if hollow
	 */
	var Dome = function(width, depth, height, thickness) {
		BaseShape.call(this, width, depth, height, thickness);

		var minDimension = Math.min(this.width, this.depth, this.height * 2);

		this.minRadius = minDimension / 2;
		this.adjustedMinRadius = (minDimension - 1) / 2;
	};

	Dome.prototype = Object.create(BaseShape.prototype);
	/**
	 * Generates a 3d matrix of booleans indicating if the cell is occupied
	 *
	 * @this {Dome}
	 * @return {Boolean[][][]}
	 */
	Dome.prototype.generate3d = function() {
		var out = [],
			zRadius = this.height - 0.5,
			realZRadius = this.height,

			zFactor = zRadius / this.adjustedMinRadius,

			adjustedZ,
			circleRadius,
			zHeight, z;

		for (z = 0.5; z <= zRadius; z++) {

			adjustedZ = Math.abs(z / zFactor);
			zHeight = this.minRadius - adjustedZ;
			circleRadius = Math.sqrt(zHeight * (2 * this.adjustedMinRadius - zHeight));

			out.push(this.generateRotation(circleRadius));
		}
		return out;
	};

	return Dome;

});