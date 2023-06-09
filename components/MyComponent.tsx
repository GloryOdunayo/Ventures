import Image from 'next/image';

interface MyComponentProps {
    selectedButton: string;
  }
  
  const imageMap: { [key: string]: string } = {
    "Button 1": "/images/landingPage/books.png",
    "Button 2": "/images/landingPage/resources.png",
    "Button 3": "/images/landingPage/resource.png",
    "Button 4": "/images/landingPage/coaching.png",
    "Button 5": "/images/landingPage/community.png",
  };

  const MyComponent: React.FC<MyComponentProps> = ({ selectedButton }) => {
    let content: string;
    let title: string;

    const image = imageMap[selectedButton];
  
    switch (selectedButton) {
      case "Button 1":
        title = "Gain a competitive edge with our robust Learning Hub";
        content = "A treasure trove of educational content, courses, and workshops. Whether you're looking to fine-tune your business strategy, sharpen your leadership skills, or delve into the latest market trends, our Learning Hub has you covered with courses from industry experts";
        break;
      case "Button 2":
        title = "Discover resources curated to fuel your success!";
        content = "Navigate the entrepreneurial landscape with confidence using our Resource Centre. Discover a vast repository of tools, perks, templates, and guides curated to help you overcome challenges and optimise your operations. From financial models to marketing";
        break;
      case "Button 3":
        title = "Discover resources curated to fuel your success!";
        content = "Navigate the entrepreneurial landscape with confidence using our Resource Centre. Discover a vast repository of tools, perks, templates, and guides curated to help you overcome challenges and optimise your operations. From financial models to marketing";

        break;
        case "Button 4":
        title = "Accelerate your venture's growth with personalised coaching.";
        content = "Navigate the entrepreneurial landscape with confidence using our Resource Centre. Discover a vast repository of tools, perks, templates, and guides curated to help you overcome challenges and optimise your operations. From financial models to marketing";
        break;
        case "Button 5":
        title = "Join our Interactive Communities.";
        content = "Connect with vibrant communities of entrepreneurs, investors, and industry professionals who share your interests or are in your field through our interactive Communities. Collaborate, exchange ideas, and foster valuable relationships with fellow innovators. Share experiences, seek advice, and celebrate successes together. Our communities provide a supportive ecosystem where you can learn, grow, and expand your network.";
        break;
      default:
        title = "Gain a competitive edge with our robust Learning Hub";
        content = "A treasure trove of educational content, courses, and workshops. Whether you're looking to fine-tune your business strategy, sharpen your leadership skills, or delve into the latest market trends, our Learning Hub has you covered with courses from industry experts";
    }
  
    return <>
        <div className='row justify-content-between mt-4'>
            <div className='col-6'>
                <h3 className='text-dark'>{title}</h3>
                <p className='text-dark'>{content}</p>
            </div>
            <div className='col-4 contentImage'>
            <Image src={image} width={250} height={250} alt="Content Image" />
            </div>
        </div>
    </>;
  };
  
  export default MyComponent;  
  