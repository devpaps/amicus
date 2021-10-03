const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Ange ett användarnamn'],
			unique: 'Användarnamet är redan taget, välj ett annat. ({VALUE})',
		},
		password: {
			type: String,
			required: [true, 'Ange ett lösenord'],
			minlength: 6,
			select: false,
		},
		fullName: {
			type: String,
			required: [true, 'Ange ditt namn'],
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			required: [true, 'Ange en e-postadress'],
			unique: 'E-postadressen är redan taget, välj en annan. ({VALUE})',
			validate: {
				validator: function (v) {
					return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
				},
			},
		},
	},
	{ timestamps: true }
);
userSchema.plugin(beautifyUnique);
const User = mongoose.model('User', userSchema);

module.exports = User;
