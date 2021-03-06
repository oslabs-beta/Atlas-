import React from 'react';
import { Github, Linkedin } from '@icons-pack/react-simple-icons';
import Flip from 'react-reveal/Flip';
//profile pics
import kritika from '../../assets/kritika.png';
import nick from '../../assets/nick.png';
import clara from '../../assets/clara_photo.jpg';
import elie from '../../assets/elie_photo.jpg';
import evan from '../../assets/evan.jpg';

const Team = () => {
  const members = [
    {
      name: 'Evan Amoranto',
      github: 'https://github.com/eamoranto',
      linkedin: 'https://www.linkedin.com/in/eamoranto',
      img: evan,
    },
    {
      name: 'Elie Baik',
      github: 'https://github.com/semtemp',
      linkedin: 'https://www.linkedin.com/in/sae-min-baik/',
      img: elie,
    },
    {
      name: 'Clara Kim',
      github: 'https://github.com/clarakm',
      linkedin: 'https://www.linkedin.com/in/clarayhkim/',
      img: clara,
    },
    {
      name: 'Nick Primuth',
      github: 'https://github.com/NickPrimuth',
      linkedin: 'https://www.linkedin.com/in/nick-primuth/',
      img: nick,
    },
    {
      name: 'Kritika Sah',
      github: 'https://github.com/hellokritty',
      linkedin: 'https://www.linkedin.com/in/kritikasah/',
      img: kritika,
    },
  ];

  const teamArr = members.map((mem, index) => {
    return (
      <React.Fragment key={index}>
        <Flip left>
          <div className='member' key={`member${index}`}>
            <img className='teamImg' src={mem.img}></img>
            <h5>{mem.name}</h5>
            <span>
              <a href={mem.github} target='_blank'>
                <Github color='white' size={28} />
              </a>
              <a href={mem.linkedin} target='_blank'>
                <Linkedin color='white' size={28} />
              </a>
            </span>
          </div>
        </Flip>
      </React.Fragment>
    );
  });

  return (
    <section id='team' className='teamContainer'>
      <h2>ThermaKube Team</h2>
      <div className='profileGrp'>{teamArr}</div>
    </section>
  );
};

export default Team;
