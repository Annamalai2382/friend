import React from 'react';
import { motion } from 'framer-motion';

export function LetterPage({ onNext }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '30px 20px',
        boxSizing: 'border-box',
        zIndex: 999999
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '360px',
          minHeight: '520px',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          fontFamily: "'Caveat', cursive, sans-serif",
          fontSize: '22px',
          lineHeight: '1.6',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '10px 5px 40px 5px'
        }}
      >
        {/* Date Top Right */}
        <div
          style={{
            textAlign: 'right',
            marginBottom: '30px',
            fontSize: '22px',
            color: '#222222'
          }}
        >
          17<sup>th</sup> oct, 2026
        </div>

        {/* Salutation */}
        <div
          style={{
            marginBottom: '24px',
            fontSize: '24px',
            color: '#111111'
          }}
        >
          Dear EX-Best Friend,
        </div>

        {/* Paragraph 1 */}
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '22px',
            color: '#111111'
          }}
        >
          This is the last conversation of ours, its gonna be lengthy y bcz its hold past 1 ½ years, lets begin, when i want to say this everytime while im conveying u never listened without blackmailing myself. So this is last time so just spend few min to read. What u done in the graduation day is just for not spoiling my happiness means why u didn't in n number of fights ?, if you done the same during our clg time in any fight between u and me means may i get anyother person as best friend she never leave me alone, i have her to ask atleast had a food,where r u, how’s the day in chennai while im alone i have her to call and ask, its help me to feel im not alone. Even u before calling me i talked with deva, vicky, sathish… u only forced me to talk with u and asked who is important to either u or them, i said you and talked now they also left and u….., and i had malarrrr to talk with me even u did same thing she also left, im accepted everything with hope u will be good friend to me forever, when our classmates talking badly about our frndship i quit everyone's frndship y bcz with the hope if i have one frnd means he/she would be my good frnd but you and ur selfishness?, u said i cursed you badly, but you never know how people cursed me after ur absence, each time when we were gathering started questioning is she decided stopped talk with u means what you did? Tell me you loved her?give me promise u didn't? Started portraiting myself bad and in my hometown so many of them seen u and me i never revealed that to u y bcz u felt happy while reaching here so i dont want to spoil that and ready to face consequences till now im facing for eg: na frnds photo frame poda pona thambi aniku unna ponu kuda pathen nadanthu poitu irundhiga nu en ella frnds munadi soldren, na en family food street pona anga work pandra oru aaya enna pathu en family munadiye thambi nee inga adikadi varuviye i closed her mouth, na en frnd v2u kuthanam function pona dei unna bus stand la pathen oru ponu kuda nanu keklam vandha u both of them were fighting so that i skipped asking who is she? ……,
          
          {/* Two Images Container */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              margin: '16px 0',
              justifyContent: 'center'
            }}
          >
            <img
              src="msg1.jpeg"
              alt="Memory 1"
              style={{
                width: '48%',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #ddd',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            />
            <img
              src="msg2.jpeg"
              alt="Memory 2"
              style={{
                width: '48%',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #ddd',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            />
          </div>

          even on another side u forcing me to talk and blackmailing to talk but only in WhatsApp, so that i decided anymore dont carry this much burden just reveal the truth and i said only things which you did, and i cursed lot of things about u badly i never gonna hide anything why bcz once i true frnd and i want to leave as true frnd also. After i blocked you on final day of clg frequently i unblock and check whether u called me or not, if u failed to call me means i call u but avoid to speak as ago y bcz i want to talk with u but this frndship may chance to damage ur life and also i cant control myself to call you so that i talked rudely its destroy frndship and also bring me out of thinking about calling you, till September i unblock mrng eve afternoon ni8 and see whether u called its keep myself happy by atleast u remember myself. Sometimes my rudeness came over means i make kiruku or indhu to talk with you y bcz it help u to forget what i talked, more than everything eventhough u called after my rudeness there only i decided whatever i never change my best friend as you. After that with my new number reached you as malarrrrrr after that u know what happened. But keep remember one thing who you black mailed, cant talk anymore like ago, without tearing hand sending already teared photo is the same person u said i never forget u till my last breadth as frnd, i helped you lot for that return i dont know how u ruthlessly did this. Within few years u may forget myself but the degree u had msc more than ur efforts i had more, friendship is not for ur need, in frndship opponent also have emotions u have to value them, u frequently say “ unna azhavechathuklam anupavipa nu” just look back who's the reason behind your happiness in msc life and i quit this friendship right time thats the reason for ur current happiness too, im gonna make revenge by doing nothing, i too have interested to talk with you 1 last time but when i heard u talking with karthi or some other after i thrown far away that idea,this friendship teached me 2 things 1)learn to be selfish 2)there is a limit to believe a close frnd

        </p>

        {/* Paragraph 2 */}
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '22px',
            color: '#111111'
          }}
        >
          If you have time means just learn 2 things 1)define gratitude in frndship and 2) define guiltiness 
        </p>

        {/* Paragraph 3 */}
        <p
          style={{
            margin: '0 0 36px 0',
            fontSize: '22px',
            color: '#111111'
          }}
        >
          One thing I want to say till clg how u r?, that's the friendship every male friend need in his life, tq for that, you may change but nee enna black mail panirka kevalama treat panirka, kai already arathukna photo anupi harsha pesirka neeye enna frnd iruka soli force panitu aprum ipdi thaan pesanum apdi thaan pesanum torture panirka even after also im saying ur the my only bestfriend, not with words incase in any part of ur life every friend fail to help u in ur critical situation means this friendship will show the value, i dont want to fill with words, lets prove.finally Dont wish me anymore on my bday, if u really wanna do anything means lets celebrate aug 3 the day as friendship day for u only, finally this is also my final wish HBD di
        </p>

        {/* Sign Off */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', marginBottom: '30px' }}>
          <div style={{ fontSize: '22px', color: '#111111', marginBottom: '8px' }}>
            Yours truly,
          </div>
          <div style={{ fontSize: '24px', color: '#111111' }}>
           <span style={{ color: '#d9534f', marginLeft: '6px' }}>x x x</span>
          </div>
        </div>

        {/* Next Button */}
        {onNext && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: '25px',
              background: 'linear-gradient(90deg, #bf953f 0%, #fcf6ba 50%, #aa771c 100%)',
              color: '#07040a',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: "'Cinzel', serif",
              letterSpacing: '2px',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(170, 119, 28, 0.4)'
            }}
          >
            Next ✨
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

