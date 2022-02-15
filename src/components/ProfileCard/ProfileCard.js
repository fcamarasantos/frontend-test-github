import React from 'react'
import { Link } from 'react-router-dom'
import RoundImageProfile from '../RoundImageProfile/RoundImageProfile'
import './ProfileCard.scss'

function ProfileCard({title, subtitle, issuesNumber, forksNumber, description, img, link}) {
  return (
      <Link to={link}>
        <div className='profileCardConatiner'>
            <header></header>
            <div className='my-card-body'>
                {img ? <RoundImageProfile src={img} size={100} className='profile-img'/> : ''}
                <div className='titles'>
                    <h3 className='my-card-title'>{title}</h3>
                    <p className='my-card-subtitle'>{subtitle}</p>
                </div>

                <div className='my-card-data-numbers'>
                    <div className='my-card-issues'>
                        <h4 className='my-card-data-number'>{issuesNumber}</h4>
                        <p className='my-crad-data-subtitle'>issues</p>
                    </div>
                    <div className='my-card-forks'>
                        <h4 className='my-card-data-number'>{forksNumber}</h4>
                        <p className='my-crad-data-subtitle'>forks</p>
                    </div>
                </div>

                <div className='my-card-descption-area'>
                    <p className='my-card-description'>{description}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProfileCard