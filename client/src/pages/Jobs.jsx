import { useCardPost } from "../hooks/useCardPost";
import { CardPost } from "../components/CardPost";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./JobsStyle.css";

function Jobs() {
  const [cardPost, setCardPost] = useCardPost();

  console.log(cardPost.slice(0, 10));
  return (
    <div className="app-ctn">
      <Header title={"Job Listing"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="filter">
            <div className="posts">
              {cardPost.slice(0, 10).map((card, index) => (
                <CardPost
                  className="post-card"
                  key={index}
                  heading={card.jobtitle_name}
                  label={card.company_name}
                  location={`${card.city_name}, ${card.state_name}, ${card.country_name}`}
                  model={card.model.join(", ")}
                  experience={card.experience.join(", ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  );
}

export default Jobs;
