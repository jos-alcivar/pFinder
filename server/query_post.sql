SELECT
    jobtitle.jobtitle_name,
    ARRAY_AGG(DISTINCT experience.level ORDER BY experience.level) AS experience,
    company.company_name,
    country.country_name,
    state.state_name,
    city.city_name,
	ARRAY_AGG(DISTINCT model.model_name ORDER BY model.model_name) AS model
FROM
    post
JOIN
    jobtitle ON post.jobtitle_id = jobtitle.jobtitle_id
JOIN
    experience ON experience.experience_id = ANY(post.experience_id)
JOIN
    company ON post.company_id = company.company_id
JOIN
    city ON company.city_id = city.city_id
JOIN
    state ON city.state_id = state.state_id
JOIN
    country ON state.country_id = country.country_id
JOIN
    model ON model.model_id = ANY(post.model_id)
WHERE experience.level = 'Senior'
GROUP BY
    jobtitle.jobtitle_name,
    company.company_name,
    country.country_name,
    state.state_name,
    city.city_name