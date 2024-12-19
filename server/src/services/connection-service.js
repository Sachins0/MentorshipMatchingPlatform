const {StatusCodes} = require('http-status-codes');
const { ProfileRepository, ConnectionRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const {calculateMatchScore}= require('../utils/helper/matching-function');


const profileRepository = new ProfileRepository();
const connectionRepository= new ConnectionRepository();


async function findMatches(menteeId){
    try {
        const mentee = await profileRepository.getProfileByUserId(menteeId);
        if (!mentee || mentee.role !== 'mentee') {
          throw new AppError('Mentee profile not found or invalid',StatusCodes.INTERNAL_SERVER_ERROR);
        }
         // Find all mentor profiles
        const mentors = await profileRepository.getAllMentor();
    
        // Calculate match scores for all mentors
        const matches = mentors.map((mentor) =>({
            mentor: mentor,
            mentee: mentee,
            score: calculateMatchScore(mentor, mentee),
        }
        ));

        console.log(matches);
        // Sort matches by score (descending)
        matches.sort((a, b) => b.score - a.score);
    
        // Return top 5 matches (or more based on your requirement)
        return matches.slice(0, 5);
    } catch (error) {
        throw new AppError('Cannot find mentor',StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function createConnectionFromMatch(menteeId, mentorId){
    try {
        const mentee = await profileRepository.getProfileByUserId(menteeId);
        const mentor = await profileRepository.getProfileByUserId(mentorId);
      
        if (!mentee || !mentor) {
          throw new AppError('Mentor or Mentee profile not found.',StatusCodes.INTERNAL_SERVER_ERROR);
        }
      
        if (mentee.role !== 'mentee' || mentor.role !== 'mentor') {
          throw new AppError('Invalid roles for connection.',StatusCodes.INTERNAL_SERVER_ERROR);
        }
      
        // Check for existing connections
        const existingConnection = await connectionRepository.getConnectionById(mentorId,menteeId);
      
        if (existingConnection) {
          throw new AppError('Connection already exists.',StatusCodes.INTERNAL_SERVER_ERROR);
        }
      
        // Create a new connection
        const connection = await connectionRepository.create({
          mentorId,
          menteeId
        });
      
        return connection;
    } catch (error) {
        throw error;
    }
};
  
  // Use the matching service to find a mentor and create a connection
async function autoMatchAndConnect(menteeId){
   try {
     const matches = await findMatches(menteeId);
   
     if (matches.length === 0) {
       throw new AppError('No suitable mentors found for this mentee.',StatusCodes.INTERNAL_SERVER_ERROR);
     }
   
     // Pick the best match (highest score)
     const bestMatch = matches[0];
     return await createConnectionFromMatch(menteeId, bestMatch.mentor.userId);
   } catch (error) {
        throw error;
    }
};

async function getAllConnections(id){
  try {
    const connections= await connectionRepository.getAllConnections(id);
    console.log(connections);
    return connections;
  } catch (error) {
    console.log(error);
      throw error;
   }
};



module.exports={
    createConnectionFromMatch,
    autoMatchAndConnect,
    findMatches,
    getAllConnections
}