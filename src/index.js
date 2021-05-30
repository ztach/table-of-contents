import './index.scss';
import { registerBlockType } from '@wordpress/blocks';
import { Toolbar, ToolbarButton, Icon } from "@wordpress/components";
import { RichText, BlockControls } from "@wordpress/block-editor";
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

const HighlightButton = (props) => (
	<BlockControls>
	  <Toolbar>
		<ToolbarButton
		  label="Zaznaczenie"
		  className="highlight-button"
		  onClick={() => {
			props.onChange(
			  toggleFormat(props.value, { type: 'custom-formats/highlight' })
			);
		  }}
		  isActive={props.isActive}
		>
		  <Icon icon="admin-customizer" />
		</ToolbarButton>
	  </Toolbar>
	</BlockControls>
  );

  registerFormatType('custom-formats/highlight', {
	title: 'Zaznaczenie',
	tagName: 'span',
	className: 'highlight',
	edit: HighlightButton,
  });

registerBlockType('rob/table-of-contents', {
	title: 'Spis treści',
	description: 'Sekcja z nagłówiem oraz spisem treści, konkretnego artykułu',
	icon: {
		background: '#5f93ad',
    	foreground: '#bac749',
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
		list: {
			type: 'array',
			source: 'children',
			selector: 'ol', 
		},
	  },

	edit({attributes,setAttributes}) {
		
		const {title,list} = attributes;

		function setTitle(newTitle){
			setAttributes({title:newTitle});
		}

		function setListContent(newList){
			setAttributes({ list:newList });
		}

		return (
			<div class="table-of-contents-block">
			  <RichText
				tagName="h2"
				placeholder="Tytuł spisu treści"
				value={title}
				onChange={setTitle}
				allowedFormats={[
				  'core/bold',
				  'core/italic',
				  'core/link',
				  'core/text-color',
				  'core/strikethrough',
				  'custom-formats/highlight',
				]}
			  />
			  <RichText
				tagName="ol"
				placeholder="Spis treści"
				value={list}
				multiline="li"
				onChange={setListContent}
				allowedFormats={[
				  'core/bold',
				  'core/italic',
				  'core/link',
				  'core/text-color',
				  'core/strikethrough',
				  'custom-formats/highlight',
				]}
			  />
			</div>
		  );
		},
	  
		save({ attributes }) {
		  const { title, list } = attributes;
	  
		  return (
			<div class="table-of-contents-block">
			  <h2>{title}</h2>
			  <RichText.Content tagName="ol" value={list} />
			</div>
		  );
		},
	  });