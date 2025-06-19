const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken } = require ('../../auth');


exports.getAllTeachers = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findMany({
    
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
};

exports.getTeachersById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id : id}
    });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
};


exports.getTeachersByPassword = async (req, res) => {
  const id = parseInt(req.body.id);
  const password = req.body.password;

  try {
    const teacher = await prisma.teacher.findFirst({
      where: {
        id: id,
        password: password  
      }
    });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const token = generateToken({id})
    res.json({token})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve teacher' });
  }
};


exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = await prisma.teacher.create({ data: req.body });
    res.json(newTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create teacher' });
  }
};

exports.updateTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: req.body
    });
    res.json(updatedTeacher);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update teacher' });
  }
};

exports.deleteTeacher = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.teacher.delete({ where: { id } });
    res.json({ message: 'Teacher deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete teacher' });
  }
};
