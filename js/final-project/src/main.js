import readline from 'readline';
import { App } from './core/app.mjs'
import { Meta } from './models/helperModels/meta.mjs';

const createStd = new App();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function mainMenu() {
  console.log('\n=== School SIS ===');
  console.log('1) Create Student');
  console.log('2) Create Subject');
  console.log('3) Create Term');
  console.log('4) Enroll Student');
  console.log('0) Exit');
  rl.question('> ', async (choice) => {
    switch (choice) {
      case '1':
        await createStudent();
        break;
      case '0':
        rl.close();
        return;
    }
    mainMenu();
  });
}

async function createStudent() {
  rl.question('First name: ', (firstName) => {
    rl.question('Last name: ', (lastName) => {
      rl.question('Grade level: ', (gradeLevel) => {
        rl.question('Email (optional): ', (email) => {
          rl.question('Guardian name (optional): ', (guardianName) => {
            const result = createStd.services.students.createStudent({
              firstName,
              lastName,
              gradeLevel,
              email,
              guardianName
            });

            mainMenu();
          });
        });
      });
    });
  });
}


mainMenu();
