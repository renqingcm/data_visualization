import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './App.css';
import FilterComponent from './FilterComponent';
import CustomDropdown from './CustomDropdown';

function App() {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [remoteAllowed, setRemoteAllowed] = useState('');
  const [payPeriod, setPayPeriod] = useState('');
  const [workType, setWorkType] = useState('');
  const [results, setResults] = useState([]); 
  const [noResults, setNoResults] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [titlePlaceholder, setTitlePlaceholder] = useState('Job Title');

  const handleSearch = async () => { 
    try {
      const response = await axios.get(`http://localhost:5000/search`, {
        params: {
          title,
          companyName,
          remoteAllowed,
          payPeriod,
          workType
        }
      });
      const resultsData = response.data;
      setResults(resultsData);
      setNoResults(resultsData.length === 0);
    } catch (error) {
      console.error('Search error:', error);  
    }
  };

  useEffect(() => {
    const stars = Array.from({ length: 100 }, (_, index) => ({
      id: index,
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 2 + 1}s`
    }));

    setStars(stars);
  }, []);

  const [stars, setStars] = useState([]);

  const handleShowMore = (job) => {
    console.log("Show more clicked", job);
    setSelectedJob(job);
  };

  useEffect(() => {
    if (selectedJob) {
      console.log("Selected Job updated", selectedJob); 
    }
  }, [selectedJob]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="stars">
          {stars.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                animationDuration: star.animationDuration
              }}
            ></div>
          ))}
        </div>
        <h1 className="title">
        Find Your Next <span className="highlight">Career Opportunity</span>
        </h1>
        <p className="subtitle">
          Hi there, looking for a job? Exploring opportunities here makes it even easier. Let's get started on your search today!
        </p>
        <div className="filter-container">
          <div className="filter-component">
            <input
              type="text"
              className="filter-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={() => setTitlePlaceholder('Eg: data scientist')} 
              onBlur={() => setTitlePlaceholder('Job Title')} 
              placeholder={titlePlaceholder} 
            />
          </div>
          <div className="filter-component">
            <CustomDropdown
              className="filter-input"
              options={[
                "Swisscom", "UBS", "Amazon", "Google", "Microsoft", "Apple", "Facebook",
                "Swiss Armed Forces", "Rocken®", "myGwork - LGBTQ+ Business Community", 
                "TieTalent", "Fielmann Group", "Belk"
              ]}
              value={companyName}
              onChange={setCompanyName}
            />
          </div>
          <div className="filter-component">
            <FilterComponent
              data={[{ value: '1', label: 'Yes' }, { value: 'FALSE', label: 'No' }]}
              label="Remote"
              value={remoteAllowed}
              onChange={(e) => setRemoteAllowed(e.target.value)}
            />
          </div>
          <div className="filter-component">
            <FilterComponent
              data={[
                { value: 'HOURLY', label: 'Hourly' },
                { value: 'YEARLY', label: 'Yearly' },
                { value: 'MONTHLY', label: 'Monthly' },
                { value: 'ONCE', label: 'Once' },
                { value: 'WEEKLY', label: 'Weekly' }
              ]}
              label="Pay Period"
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
            />
          </div>
          <div className="filter-component">
            <FilterComponent
              data={[
                { value: 'CONTRACT', label: 'Contract' },
                { value: 'INTERNSHIP', label: 'Internship' },
                { value: 'FULL_TIME', label: 'Full Time' },
                { value: 'PART_TIME', label: 'Part Time' },
                { value: 'OTHER', label: 'Other' },
                { value: 'VOLUNTEER', label: 'Volunteer' },
                { value: 'TEMPORARY', label: 'Temporary' }
              ]}
              label="Job Type"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            />
          </div>
          <div className="filter-component">
            <button className="filter-button" onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="results-container">
          {noResults ? (
            <p>No matching jobs found!</p>
          ) : (
            results.map((job, index) => (
              <div key={index} className="result-item">
                <h3>{job.title} - {job.name}</h3>
                <p>{job.location}</p>
                <p className="applies-count">{job.applies}</p>
                <button onClick={() => handleShowMore(job)}>
                  Show more
                </button>
              </div>
            ))
          )}
        </div>
        {selectedJob && (
          <div className="job-details">
            <h3>Job Details</h3>
            <p><strong>Address:</strong> {selectedJob.address}</p>
            <p><strong>City:</strong> {selectedJob.city}</p>
            <p><strong>Country:</strong> {selectedJob.country}</p>
            <p><strong>Application type:</strong> {selectedJob.application_type}</p>
            <p><strong>Application url:</strong> <a href={selectedJob.application_url} target="_blank" rel="noopener noreferrer">{selectedJob.application_url}</a></p>
            <p><strong>Company size:</strong> {selectedJob.company_size}</p>
            <p><strong>Compensation type:</strong> {selectedJob.compensation_type}</p>
            <p><strong>Max salary:</strong> {selectedJob.max_salary}</p>
            <p><strong>Currency:</strong> {selectedJob.currency}</p>
            <button onClick={() => setSelectedJob(null)}>Close</button>
          </div>
        )}
      </header>
    </div>
  );  
}

export default App;
