var config = {
	pallet : {
		size : 34
	},
	positions : [
		{
			x:430,
			y:63
		},
		{
			x:325,
			y:63
		},
		{
			x:240,
			y:63
		},
		{
			x:280,
			y:3
		},
		{
			x:130,
			y:63
		}
	]
}

var pallets = [1,1,1,1,1];
var pallet;
var n = 0;
function add_pallet1(){
	n++;
	var svg = d3.select('svg');
	pallet = svg.append('rect')
		.attr("x" , config.positions[0].x)
		.attr("y" , config.positions[0].y)
		.attr("width" , config.pallet.size)
		.attr("height" , config.pallet.size);
};

function move_pallet12(){

	   //console.log(pallet.transition().x);

		pallet.transition()
		.attr("x",config.positions[1].x)
		.attr("y",config.positions[1].y)
		.duration(1000);
};

function move_pallet23(){
	
		pallet.transition()
		.attr("x",config.positions[2].x)
		.attr("y",config.positions[2].y)
		.duration(1000);
};

function move_pallet35(){
	
		pallet.transition()
		.attr("x",config.positions[4].x)
		.attr("y",config.positions[4].y)
		.duration(1000);
};

function move_pallet14(){
	
		pallet.transition()
		.attr("x",config.positions[3].x)
		.attr("y",config.positions[3].y)
		.duration(1000);
};

function move_pallet45(){
	
		pallet.transition()
		.attr("x",config.positions[4].x)
		.attr("y",config.positions[4].y)
		.duration(1000);

};


	
function eject_pallet(){
	pallets[4]= 0;
    //draw_pallets();
};
		
function delete_all_pallets(){
	//pallets=[0,0,0,0,0];
	//pallet.removeAll();
	svg.selectAll("*").remove();
};

function getCoordinates(){

}


