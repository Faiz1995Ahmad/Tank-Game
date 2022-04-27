export default class Obstacles
{
    constructor()
    {
    }
    CreateObstacles(_scene,_image,_x,_y,_destroyable,_totalLifeLeft,_frame)
    {
        let image = _scene.add.image(_x,_y, _image).setOrigin(0.5).setScale(1);
        image.destroyable = _destroyable;
        image.totalLifeLeft = _totalLifeLeft;
        image.totalLifeLeftText = null;
        image.name ="faiz"
        image.setFrame(_frame);
        if(_destroyable)
        {
            this.SetLifeText(_scene,_totalLifeLeft,_x,_y,image);
        }
        return image
    }
    SetLifeText(_scene,_totalLifeLeft,_x,_y,_image)
    {
        const style = { font: "bold 20px Arial", fill: "#fff" };
        _image.totalLifeLeftText = _scene.add.text(_x,_y,  _image.totalLifeLeft+"%", style)
        .setOrigin(0.5).setScale(1);       
    }
}