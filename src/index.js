import './index.scss';
import { registerBlockType } from '@wordpress/blocks';
import { func } from 'assert-plus';


registerBlockType('rob/table-of-contents', {
	title: 'Spis treści',
	description: 'Sekcja z nagłówiem oraz spisem treści, konkretnego artykułu',
	icon: {
		background: '#37474F',
    	foreground: '#4DB6AC',
		src: <svg height="512pt" viewBox="0 -52 512.00001 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m0 113.292969h113.292969v-113.292969h-113.292969zm30.003906-83.289063h53.289063v53.289063h-53.289063zm0 0"/><path d="m149.296875 0v113.292969h362.703125v-113.292969zm332.699219 83.292969h-302.695313v-53.289063h302.695313zm0 0"/><path d="m0 260.300781h113.292969v-113.292969h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/><path d="m149.296875 260.300781h362.703125v-113.292969h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/><path d="m0 407.308594h113.292969v-113.296875h-113.292969zm30.003906-83.292969h53.289063v53.289063h-53.289063zm0 0"/><path d="m149.296875 407.308594h362.703125v-113.296875h-362.703125zm30.003906-83.292969h302.695313v53.289063h-302.695313zm0 0"/></svg>
		},
	keywords: [ 'zawartość', 'lista', 'table of contents' ],
	category: 'content',

	attributes: {
		title: {
		  type: 'string',
		  source: 'html',
		  selector: 'h2',
		},
	  },

	edit({attributes,setAttributes}) {
		
		const {title} = attributes;

		function setTitle(event){
			const newTitle = event.target.value;
			setAttributes({title:newTitle});
		}

		return <input 
				type="text"
				value={title}
				onChange={setTitle}
				/> 
		 ;
	},

	save({attributes}) {
		const {title} = attributes;

		return <h2>{title}</h2>
	}
});