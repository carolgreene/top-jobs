# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: 'max', password: 'password', role: 01)
User.create(name: 'indie', password: 'password', role: 01)
User.create(name: 'ozzie', password: 'password', role: 0)
User.create(name: 'augie', password: 'password', role: 0)

Job.create(title: 'Software Developer', location: 'Chicago', category: 'IT', description: 'Exciting job with great benefits', salary: 100, company_id: 01, company_name: 'Google')
Job.create(title: 'Junior Developer', location: 'Chicago', category: 'IT', description: 'Great opportunity', salary: 70, company_id: 01, company_name: 'Google')
Job.create(title: 'Web Developer', location: 'Naperville', category: 'IT', description: 'Fun job with great company', salary: 80, company_id: 02, company_name: 'Amazon')
Job.create(title: 'Senior Developer', location: 'Chicago', category: 'IT', description: 'Great opportunity for top developer', salary: 125, company_id: 02, company_name: 'Amazon')

JobApplication.create(user_id: 3, job_id: 1, email: 'ozzie@ozzie.com', qualifications: 'Lots of coding experience', name: 'Ozzie Greene', applicant_id: 3, years_of_experience: 5)
JobApplication.create(user_id: 4, job_id: 1, email: 'augie@augie.com', qualifications: 'I just finished bootcamp & I love to code!', name: 'Augie Greene', applicant_id: 4, years_of_experience: 1)
JobApplication.create(user_id: 4, job_id: 2, email: 'augie@augie.com', qualifications: 'I just finished bootcamp & I love to code!', name: 'Augie Greene', applicant_id: 4, years_of_experience: 1)
JobApplication.create(user_id: 3, job_id: 3, email: 'ozzie@ozzie.com', qualifications: "I'm a great coder!", name: 'Ozzie Greene', applicant_id: 3, years_of_experience: 5)
JobApplication.create(user_id: 4, job_id: 3, email: 'augie@augie.com', qualifications: "I just finished bootcamp & I'm ready for a challange!", name: 'Augie Greene', applicant_id: 4, years_of_experience: 1)
JobApplication.create(user_id: 3, job_id: 4, email: 'ozzie@ozzie.com', qualifications: 'I have tons of coding experience', name: 'Ozzie Greene', applicant_id: 3, years_of_experience: 5)

#can also load applications by assigning each job to a variable & then using variable to create the job.
# ie:  job1.job_applications.create(....)   job_applications are nested in jobs
#or w/o variable assignment, can do this:    Job.first.job_applications.create(...)