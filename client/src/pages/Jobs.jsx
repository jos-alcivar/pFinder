import { useJobPost } from "../hooks/useJobPost";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { CardPost } from "../components/CardPost";
import { FilterOptions } from "../forms/FilterOptions";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import "./style.css";
import "./Jobs.css";

function Jobs() {
  const [jobPost, setJobPost] = useJobPost();
  const [filterOptions, setFilterOptions] = useFilterOptions();

  console.log(jobPost.slice(0, 10));
  return (
    <div className="app-ctn">
      <Header title={"Job Listing"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="filter">
            <FilterOptions
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
            <div className="posts">
              {jobPost.slice(0, 10).map((card, index) => (
                <CardPost
                  className="post-card"
                  key={index}
                  heading={card.jobtitle_name}
                  label={card.company_name}
                  location={`${card.city_name}, ${card.country_name}`}
                  model={card.model.join(", ")}
                  experience={card.experience.join(", ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <TabBar jobs={"selected"} />
    </div>
  );
}

export default Jobs;
