import User from "../Models/user.model.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("==== Upload Resume Controller Triggered ====");
    console.log("req.userId:", req.userId);
    console.log("req.body:", req.body);

    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    const { resumeUrl } = req.body;
    if (!resumeUrl) {
      return res.status(400).json({ message: 'Resume URL is required' });
    }

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) {
      console.log("User not found for ID:", req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user
    user.resumeUrl = resumeUrl;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      user,
    });

  } catch (error) {
    console.error('Error uploading resume:', error);
    return res.status(500).json({
      message: 'Server error while uploading resume',
      error: error.message,
    });
  }
};
