(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var vm = new Vue({
		el:'#app',
		data:{
			list:[],
			info:'',
			newname:'',
			liststatus:'all'
		},
		methods: {
			change(index){
				this.list[index].checked = !this.list[index].checked
			},
			del(index){
				this.list.splice(index,1)
			},
			add(){
				if(this.info.trim() == ''){
					return
				}
				this.list.unshift({name:this.info,checked:false})	
				this.info=""			
			},
			showedit(index){
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].isedit = false
				}
				this.list[index].isedit = true
				this.newname = this.list[index].name
			},
			edit(index){
				this.list[index].name = this.newname
				this.list[index].isedit = false

			},
			isshow(v){
				switch (this.liststatus) {
					case 'active':
						return v.checked
						break;
						case 'completed':
						return !v.checked
						break;
						default:
						return true
						break;
				}
			},
			clearall(){
				this.list = this.list.filter(v => {
					return !v.checked
				})
			}
		},
		computed:{
			// toggleall(){
			// 	// var temp = this.list.filter(v => {
			// 	// 	return !v.checked
			// 	// })
			// 	// return temp.length? false : true
			// 	return !this.list.filter(v => {
			// 		return !v.checked
			// 	}).length
			// }
			toggleall:{
				set(newvalue){
					this.list.forEach(v => {
						v.checked = newvalue
					});
				},
				get(){
					if(this.list.length == 0) {
						return
					}
					return !this.list.filter(v => {
								return !v.checked
							}).length
				}
			}
		},
		updated () {
			localStorage.setItem('info',JSON.stringify(this.list))
		},
		mounted () {
			this.list = JSON.parse(localStorage.getItem('info'))
		}
	})
})(window);
