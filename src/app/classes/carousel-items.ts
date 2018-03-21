export class CarouselItems {
    public header : string;
    public desc : string;
    public img : string;
    public actbutton: boolean;
    public actlink: string;
    public class : string;
    constructor(header,desc,img,actbutton,actlink){
        this.header = header;
        this.desc = desc;
        this.img = img;
        this.actbutton = actbutton;
        this.actlink = actlink;
        this.class = 'carousel-item';
    }
}
